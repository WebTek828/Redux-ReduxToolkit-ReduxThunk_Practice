const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      pickedAmount: Number,
    },
  ],
});

module.exports = mongoose.model("CartItem", cartSchema);
