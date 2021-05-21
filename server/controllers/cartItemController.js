const { update } = require("../Modals/CartItem");
const CartItem = require("../Modals/CartItem");

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
      const existingCartItem = cartItems.filter((cartItem) => {
        return cartItem.id.toString() === productId;
      });
      if (existingCartItem.length > 0) {
        res
          .status(400)
          .json({ err: "This product already exist in the cart." });
        return;
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
          res.status(200).json(cartItems);
        }
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Something went wrong", err });
  }
};

const updateCartItemAmount = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { type } = req.body;
    const cartItems = await CartItem.find({});
    cartItems[0].cartItems.map((cartItem, i) => {
      if (cartItem._id.toString() === cartItemId) {
        if (type === "inc") {
          cartItem.pickedAmount += 1;
        } else {
          if (cartItem.pickedAmount > 1) {
            cartItem.pickedAmount -= 1;
          } else {
            cartItems[0].cartItems.splice(i, 1);
          }
        }
      }
    });

    await cartItems[0].save();
    res.status(200).json({ msg: "Updated" });
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
};

exports.getAllCartItems = getAllCartItems;
exports.addCartItem = addCartItem;
exports.updateCartItemAmount = updateCartItemAmount;
