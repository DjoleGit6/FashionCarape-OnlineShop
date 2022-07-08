const Product = require("../models/ProductModel.js");
const BestSellingProduct = require("../models/BestSellingProductModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");
const cloudinary = require("cloudinary");
const mongo4j = require('mongo4j');

// create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  const productName = product.name;

  const category = product.category;

  const session1 = mongo4j.getDriver().session();

  try {
    const result1 = await session1.writeTransaction(async (tx) =>
      await tx.run('MATCH (n:Product) WITH n MATCH (m:Category) \
      WHERE n.name = $productNameParam and m.name = $categoryParam CREATE (n)-[r:IN_CATEGORY]->(m) \
      RETURN n;', { productNameParam: productName, categoryParam: category })
    );
  }
  finally {
    await session1.close();
  }

  const similarProducts = [];

  const session2 = mongo4j.getDriver().session();

  const titles = [];
  try {
    const result2 = await session2.readTransaction(tx =>
      tx.run('MATCH (p:Product {name: $nameParam}) \
        MATCH (p)-[:IN_CATEGORY]->(c:Category {name: $categoryParam})<-[:IN_CATEGORY]-(p2:Product) \
        RETURN p2.name;', { nameParam: productName, categoryParam: category })
    );

    const records = result2.records;
    console.log(records);
    for (let j = 0; j < records.length; j++) {
      const title = records[j].get(0);
      titles.push(title);
    }
  }
  finally {
    await session2.close();
  }

  for (let k = 0; k < titles.length; k++) {
    console.log(titles[k]);
    const similarProduct = await Product.findOne({ name: titles[k] });
    const updatedSimilarProduct = await updateSimilarProduct(similarProduct._id, product);
    similarProducts.push(updatedSimilarProduct);
    product.similarProducts.push(updatedSimilarProduct);
  }

  console.log("Slicni proizvodi:");
  console.log(similarProducts);

  await product.save({ validateBeforeSave: false });

  const session3 = mongo4j.getDriver().session();

  try {
    const result3 = await session3.writeTransaction(async (tx) =>
      await tx.run('MATCH (n:Product {name: $productNameParam}) \
      MATCH (n)-[:IN_CATEGORY]->(c:Category {name: $categoryParam})<-[:IN_CATEGORY]-(m:Product) \
      CREATE (n)-[:SIMILAR]->(m) \
      CREATE (m)-[:SIMILAR]->(n) \
      RETURN n;',
        { productNameParam: productName, categoryParam: category })
    );
  }
  finally {
    await session3.close();
  }

  res.status(201).json({
    success: true,
    product
  })
});

async function updateSimilarProduct(id, product) {
  const similarProduct = await Product.findById(id);
  similarProduct.similarProducts.push(product);
  await similarProduct.save({ validateBeforeSave: false });
  return similarProduct;
}

// get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

  const resultPerPage = 8;

  const productsCount = await Product.countDocuments();

  const feature = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    ;
  const products = await feature.query;

  const tempArray = await BestSellingProduct.find();

  const bestSellingProducts = [];

  for (i=0; i<tempArray.length; i++)
  {
    const product = await Product.findById(tempArray[i].product);
    bestSellingProducts.push(product);
  }

  res.status(200).json({
    success: true,
    products,
    bestSellingProducts,
    productsCount,
    resultPerPage
  })
});

// Update Product ---Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Proizvod sa ovim ID-em nije pronađen", 404))
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {

    // Delete image from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }
    req.body.images = imagesLinks;
  }

  product.updateNeo(req.body);

  res.status(200).json({
    success: true,
    product
  })
});

// delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Proizvod sa ovim ID-em nije pronađen", 404))
  }

  // Deleting images from cloudinary
  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  const productName = product.name;

  const category = product.category;

  const session = mongo4j.getDriver().session();

  const titles = [];
  try {
    const result2 = await session.readTransaction((tx) =>
      tx.run('MATCH (n:Product {name: $productNameParam}) \
      MATCH (n)-[:IN_CATEGORY]->(c:Category {name: $categoryParam})<-[:IN_CATEGORY]-(m:Product) \
      MATCH (n)-[:SIMILAR]->(m) \
      RETURN m.name;',
        { productNameParam: productName, categoryParam: category })
    );
    const records = result2.records;
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
    const updatedSimilarProduct = await deleteProductFromSimilarProductsList(similarProduct._id, product);
    console.log(updatedSimilarProduct);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Proizvod uspešno obrisan"
  })

});

async function deleteProductFromSimilarProductsList(id, product) {
  const similarProduct = await Product.findById(id);
  similarProduct.similarProducts.pop(product);
  await similarProduct.save({ validateBeforeSave: false });
  return similarProduct;
}

// single Product details
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Proizvod sa ovim ID-em nije pronađen", 404));
  }

  const similarProducts = product.similarProducts;
  const recProducts = []
  for (i = 0; i < similarProducts.length; i++) {
    console.log(similarProducts[i]);
    const recProduct = await Product.findById(similarProducts[i]._id);
    recProducts.push(recProduct);
  }
  console.log(recProducts);
  res.status(200).json({
    success: true,
    product,
    recProducts
  })
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// Create New Review or Update the review  
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;

  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  const recProductsCF = [];

  const session = mongo4j.getDriver().session();

  const titles = [];
  try {
    const result2 = await session.readTransaction((tx) =>
      tx.run('MATCH (u:User {name: $userParam})<--(p:Product{name:$productParam}) \
      MATCH (p)-[r:RATED_BY]->(u) \
      MATCH (p)-[r2:RATED_BY]->(u2:User)<-[r3:RATED_BY]-(rec:Product) \
      WHERE (NOT (rec)-[:RATED_BY]->(u)) AND rec.stock > 0 AND r.rating >= 3 AND r3.rating >= 4 \
      RETURN rec.name, rec.ratings AS rates ORDER BY rates DESC LIMIT 8;',
        { userParam: req.user.name, productParam: product.name })
    );
    const records = result2.records;
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
    const recProductCF = await Product.findOne({ name: titles[k] });
    recProductsCF.push(recProductCF);
  }
  console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
  console.log(recProductsCF);

  res.status(200).json({
    success: true,
    recProductsCF
  });
});

// Get All reviews of a single product
exports.getSingleProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Proizvod sa ovim ID-em nije pronađen", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews
  });
});

// Delete Review --Admin
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Proizvod sa ovim ID-em nije pronađen", 404));
  }

  const productName = product.name
  const review = product.reviews.filter(
    (rev) => rev._id.toString() == req.query.id.toString()
  );

  console.log(review);

  const reviewUser = review[0].name;

  console.log(reviewUser);

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  console.log(reviews);

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  product.updateNeo({ ratings, numOfReviews });

  const session = mongo4j.getDriver().session();
  console.log(session);
  session.run(
    'MATCH (n:Product {name: $productNameParam})-[r:RATED_BY]->(u:User {name: $reviewUserParam}) DELETE r;',
    { productNameParam: productName, reviewUserParam: reviewUser }
  );

  // const result = await Product.cypherQuery(
  //   'MATCH (n:Product {name: $productNameParam})-[r:RATED_BY]->(n:User {name: $reviewUserParam}) DELETE r;',
  //   {productNameParam: productName, reviewUserParam: reviewUser}
  //   )

  // console.log(result);

  res.status(200).json({
    success: true,
  });
});
