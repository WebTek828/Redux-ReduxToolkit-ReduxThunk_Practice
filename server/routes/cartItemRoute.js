const route = require("express").Router();
const cartItemController = require("../controllers/cartItemController");

route.get("/", cartItemController.getAllCartItems);
route.post("/", cartItemController.addCartItem);

module.exports = route;
