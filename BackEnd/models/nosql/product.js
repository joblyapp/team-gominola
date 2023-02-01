const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: mongoose.Types.Decimal128,
    },
    imageId: {
        type: Schema.Types.ObjectId,
        ref: "storage"
    },
})

module.exports = mongoose.model("products", ProductSchema)