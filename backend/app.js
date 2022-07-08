const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const path = require("path");
var cors = require('cors');
nconf = require("./config/config.js");
const schedule = require('node-schedule');
const mongo4j = require('mongo4j');
const Product = require("./models/ProductModel.js");
const BestSellingProduct = require("./models/BestSellingProductModel.js");

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}
console.log(process.env.NODE_ENV);

// Route imports
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");

app.use("/api/v2", product);

app.use("/api/v2", user);

app.use("/api/v2", order);

app.use("/api/v2", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

// const job = schedule.scheduleJob('0 */1 * * * *', async function () {
//     console.log('The answer to life, the universe, and everything!');
// });

// delete array property from MongoDB
async function deleteSimilarProductsFromMongoDB() {
    await Product.updateMany({}, { $unset: { "similarProducts": [] } });
}

async function createSimilarProducts() {
    const products = await Product.find();

    for (let i = 0; i < products.length; i++) {
        const productName = products[i].name;
        const category = products[i].category;
        const similarProducts = [];

        const session = mongo4j.getDriver().session();

        const titles = [];
        try {
            const result = await session.readTransaction(tx =>
                tx.run('MATCH (p:Product {name: $nameParam}) \
                        MATCH (p)-[:IN_CATEGORY]->(c)<-[:IN_CATEGORY]-(p2:Product) \
                        WHERE p2.stock > 0 \
                        RETURN p2.name, p2.ratings AS rates ORDER BY rates DESC LIMIT 8;', { nameParam: productName })
            );

            const records = result.records;
            console.log(records);
            for (let j = 0; j < records.length; j++) {
                const title = records[j].get(0);
                titles.push(title);
            }
        }
        finally {
            await session.close();
        }

        for (let k = 0; k < titles.length; k++) {
            console.log(titles[k]);
            const similarProduct = await Product.findOne({ name: titles[k] });
            similarProducts.push(similarProduct);
            products[i].similarProducts.push(similarProduct)
        }

        console.log("Slicni proizvodi:");
        console.log(similarProducts);

        await products[i].save({ validateBeforeSave: false });
    }
}

async function deleteBestSellingProducts () {
    await BestSellingProduct.deleteMany({});
}

async function addBestSellingProducts () {
    const products = await Product.find();

    const bestSellingProducts = [];

    const session = mongo4j.getDriver().session();

  const titles = [];
  try {
    const result = await session.readTransaction(tx =>
      tx.run('MATCH (p:Product) \
      WHERE p.stock > 0 \
      RETURN p.name, p.sales_counter as salesCounter ORDER BY salesCounter DESC LIMIT 8;')
    );

    const records = result.records;
    console.log(records);
    for (let j = 0; j < records.length; j++) {
      const title = records[j].get(0);
      titles.push(title);
    }
  }
  finally {
    await session.close();
  }

  for (let k = 0; k < titles.length; k++) {
    console.log(titles[k]);
    const recProduct = await Product.findOne({ name: titles[k] });
    const body = {
        name: recProduct.name,
        product: recProduct
    }
    const bestSellingProduct = await createBestSellingProduct(body);
    bestSellingProducts.push(bestSellingProduct);
  }
  console.log(bestSellingProducts);
}

async function createBestSellingProduct(body) {
   const bestSellingProduct = await BestSellingProduct.create(body);
   return bestSellingProduct;
}

//deleteSimilarProductsFromMongoDB();
//createSimilarProducts();
//deleteBestSellingProducts();
//addBestSellingProducts();

// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app