const mongo4j = require("mongo4j");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Unesite naziv proizvoda"],
        trim: true,
        maxLength: [50, "Naziv proizvoda ne sme biti duži od 50 karaktera"],
        neo_prop: true
    },
    description: {
        type: String,
        required: [true, "Dodajte opis vašeg proizvoda"],
        maxlength: [5000, "Opis ne može biti duži od 5000 karaktera"],
        neo_prop: true
    },
    price: {
        type: Number,
        required: [true, "Dodajte cenu za svoj proizvod"],
        maxLength: [8, "Cena ne može biti veća od 8 karaktera"],
        neo_prop: true
    },
    offerPrice: {
        type: String,
        maxLength: [4, "Cena sa popustom ne može biti veća od 4 karaktera"],
        neo_prop: true
    },
    ratings: {
        type: Number,
        default: 0,
        neo_prop: true
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
                neo_prop: true
            },
            url: {
                type: String,
                required: true,
                neo_prop: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, "Dodajte kategoriju svog proizvoda"],
        neo_prop: true
    },
    Stock: {
        type: Number,
        required: [true, "Molimo vas da dodate zalihu za svoj proizvod"],
        maxLength: [3, "Zaliha ne može biti veća od 3 znaka"],
        neo_prop: true
    },
    salesCounter: {
        type: Number,
        default: 0,
        neo_prop: true
    },
    numOfReviews: {
        type: Number,
        default: 0,
        neo_prop: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
                neo_rel_name: "Rated By"
            },
            name: {
                type: String,
                required: true,
                neo_prop: true
            },
            rating: {
                type: Number,
                required: true,
                neo_prop: true
            },
            comment: {
                type: String,
                neo_prop: true
            },
            time: {
                type: Date,
                default: Date.now(),
                neo_prop: true
            },
        },
    ],
    similarProducts: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                neo_omit_rel: true
            },
            name: {
                type: String,
                required: true,
                neo_prop: true
            },
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        //   required: true
        neo_omit_rel: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
        neo_prop: true
    }
})

productSchema.plugin(mongo4j.plugin());

module.exports = mongoose.model("Product", productSchema);