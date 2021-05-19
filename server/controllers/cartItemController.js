const CartItem = require("../Modals/CartItem");
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({});
    res.status(200).json(cartItems);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong", err });
  }
};

const addCartItem = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await CartItem.find({});
    if (cart.length === 0) {
      const newCartItem = await CartItem.create({
        cartItems: productId,
      });
      console.log(newCartItem);
    } else {
      cart.push(productId);
      console.log(cart);
    }
    res.status(200).json({ msg: "Product successfully added to cart." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong", err });
  }
};

exports.getAllCartItems = getAllCartItems;
exports.addCartItem = addCartItem;
