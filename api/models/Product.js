const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    percent: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
    },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
