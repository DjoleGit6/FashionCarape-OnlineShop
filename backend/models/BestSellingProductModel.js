const mongoose = require("mongoose");

const bestSellingProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Unesite naziv proizvoda"],
        trim: true,
        maxLength: [50, "Naziv proizvoda ne sme biti duži od 50 karaktera"],
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("BestSellingProduct", bestSellingProductSchema);