const catchAsyncErrors = require("../middleware/catchAsyncErrors");
require("dotenv").config({
  path:"backend/config/.env"
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.Payment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "FASHIONCARAPE",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
