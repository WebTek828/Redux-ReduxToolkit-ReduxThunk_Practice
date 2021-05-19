const Products = require("../Modals/Products");

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong", err });
  }
};

exports.getProducts = getProducts;
