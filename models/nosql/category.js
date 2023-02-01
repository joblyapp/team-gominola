const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategoryScheme = mongoose.Schema({
    name: {
        type: String,
    },
    isFood: {
        type: Boolean,
    },
    imageId: {
        type: Schema.Types.ObjectId,
        ref: "storage"
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "products"
    }],
})

module.exports = mongoose.model("category", CategoryScheme)