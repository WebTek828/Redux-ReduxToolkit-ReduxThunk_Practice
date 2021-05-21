const route = require("express").Router();
const cartItemController = require("../controllers/cartItemController");

route.get("/", cartItemController.getAllCartItems);
route.post("/", cartItemController.addCartItem);
route.put("/:cartItemId", cartItemController.updateCartItemAmount);

module.exports = route;
