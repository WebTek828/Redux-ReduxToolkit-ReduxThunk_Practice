const CartItem = require("../Modals/CartItem");
const Products = require("../Modals/Products");

const getAllCartItems = async (req, res) => {
  try {
    CartItem.find({})
      .populate("cartItems")
      .exec((err, cartItems) => {
        if (err) {
          res.status(400).json({ msg: "error occured", err });
        } else {
          res.status(200).json(cartItems);
        }
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong", err });
  }
};

const addCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await CartItem.find({});
    if (cart.length < 1) {
      await CartItem.create({
        cartItems: [productId],
      });
    } else {
      const cartItems = cart[0].cartItems;
      const existingCartItem = cartItems.filter(
        (cartItem) => cartItem._id.toString() === productId
      );
      if (existingCartItem.length > 0) {
        res
          .status(400)
          .json({ err: "This product already exist in the cart." });
      } else {
        cart[0].cartItems.push(productId);
        await cart[0].save();
      }
    }
    const newlyAddedProduct = await Products.findById(productId);
    res.status(200).json(newlyAddedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong", err });
  }
};

exports.getAllCartItems = getAllCartItems;
exports.addCartItem = addCartItem;
