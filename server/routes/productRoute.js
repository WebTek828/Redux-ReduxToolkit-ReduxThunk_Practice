const route = require("express").Router();
const productController = require("../controllers/productController");

route.get("/", productController.getProducts);

module.exports = route;
