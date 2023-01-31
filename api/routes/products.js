const express = require("express");
const { postProduct } = require("../controllers/productController");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello world!");
});

router.post("/", postProduct);

module.exports = router;
