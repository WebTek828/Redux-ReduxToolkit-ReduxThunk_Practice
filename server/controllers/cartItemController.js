const CartItem = require("../Modals/CartItem");
const Products = require("../Modals/Products");

const getAllCartItems = async (req, res) => {
  try {
    CartItem.find({})
      .populate("cartItems.id")
      .exec((err, cartItems) => {
        if (err) {
          console.log(err);
          res.status(400).json(err);
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
    let newlyAddedProduct;
    if (cart.length < 1) {
      const created = await CartItem.create({
        cartItems: {
          id: productId,
          pickedAmount: 1,
        },
      });
      newlyAddedProduct = created.cartItems[0];
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
        newlyAddedProduct = {
          id: productId,
          pickedAmount: 1,
        };
        cart[0].cartItems.push(newlyAddedProduct);
        await cart[0].save();
      }
    }
    CartItem.find({})
      .populate("cartItems.id")
      .exec((err, cartItems) => {
        if (err) {
          console.log(err);
        } else {
          console.log(cartItems);
          res.status(200).json(cartItems);
        }
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong", err });
  }
};

exports.getAllCartItems = getAllCartItems;
exports.addCartItem = addCartItem;
