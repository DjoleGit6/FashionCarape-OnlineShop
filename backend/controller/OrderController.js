const Order = require("../models/OrderModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/ProductModel");
const mongo4j = require('mongo4j');

// Create Order
exports.createOrder = catchAsyncErrors(async (req,res,next) =>{

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user: req.user._id,
    });

    

    res.status(201).json({
        success: true,
        order
    });
});

//  Get Single order
exports.getSingleOrder = catchAsyncErrors(async (req,res,next) =>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order){
        return next(new ErrorHandler("Order not found with this id",404));
    }

    res.status(200).json({
        success: true,
        order
    });
});

// Get all orders
exports.getAllOrders = catchAsyncErrors(async (req,res,next) =>{
    const orders = await Order.find({user: req.user._id});

    const userName = req.user.name;

  console.log(userName);

  const session = mongo4j.getDriver().session();

  const titles = [];
  try {
    const result = await session.readTransaction(tx =>
      tx.run('MATCH (u:User {name: $nameParam}) \
    MATCH (u)<-[:MAKED_BY]-(:Order)-[:CONTAINS_PRODUCT]->(p:Product) \
    MATCH (p)<-[:CONTAINS_PRODUCT]-(:Order)-[:MAKED_BY]->(c:User) \
    MATCH (c)<-[:MAKED_BY]-(:Order)-[:CONTAINS_PRODUCT]->(rec:Product) \
    WHERE (NOT (u)<-[:MAKED_BY]-(:Order)-[:CONTAINS_PRODUCT]->(rec)) \
    RETURN properties(rec).name, COUNT(*) AS score ORDER BY score DESC LIMIT 8;', { nameParam: userName })
    );

    const records = result.records;
    console.log(records);
    for (let i = 0; i < records.length; i++) {
      const title = records[i].get(0);
      titles.push(title);
    }
  } finally {
    await session.close();
  }
  console.log(titles);

  const products = [];

  for(i=0; i<titles.length; i++) {
    console.log(titles[i]);
    const product = await Product.findOne({ name: titles[i] });
    products.push(product);
  }

  console.log(products);
    res.status(200).json({
        success: true,
        orders,
        products
    });
});

// Get All orders ---Admin
exports.getAdminAllOrders = catchAsyncErrors(async (req,res,next) =>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) =>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// update Order Status ---Admin
exports.updateAdminOrder = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);

    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Porudžbina sa ovim ID-em nije pronađena", 404));
    }
  
    if (order.orderStatus === "Isporučeno") {
      return next(new ErrorHandler("Već ste isporučili ovu porudžbinu", 400));
    }
  
    if (req.body.status === "Otpremljeno") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Isporučeno") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  
  async function updateStock(id, quantity) {
      
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
    product.salesCounter += quantity;
  
    await product.save({ validateBeforeSave: false });
  }


// delete Order ---Admin
exports.deleteOrder = catchAsyncErrors(async (req,res,next) =>{

    const order = await Order.findById(req.params.id);
    
    if(!order){
      return next(new ErrorHandler("Porudžbina sa ovim ID-em nije pronađena", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});
