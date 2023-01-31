const Product = require("../models/Product");

const postProduct = async (req, res) => {
  const { name, description, image, price, category } = req.body;
  const product = Product.create(
    {
      name,
      description,
      image,
      price,
      category,
    },
    function (error, small) {
      if (error) return console.error(error);
    }
  );
  return res.send(product);
};

module.exports = {
  postProduct,
};
