const mongo4j = require("mongo4j");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
      neo_prop: true
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      required: true,
      neo_prop: true
    },
    country: {
      type: String,
      required: true,
      neo_prop: true
    },
    pinCode: {
      type: Number,
      // required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
      neo_prop: true
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
        neo_prop: true
      },
      price: {
        type: Number,
        required: true,
        neo_prop: true
      },
      quantity: {
        type: Number,
        required: true,
        neo_prop: true
      },
      image: {
        type: String,
        required: true,
        neo_prop: true
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
        neo_rel_name: "Contains Product"
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    neo_rel_name: "Maked By"
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
      neo_prop: true
    },
    status: {
      type: String,
      required: true,
      neo_prop: true
    },
  },
  paidAt: {
    type: Date,
    required: true,
    neo_prop: true
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
    neo_prop: true
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
    neo_prop: true
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
    neo_prop: true
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
    neo_prop: true
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Obrada",
    neo_prop: true
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    neo_prop: true
  },
});

orderSchema.plugin(mongo4j.plugin());

module.exports = mongoose.model("Order", orderSchema);