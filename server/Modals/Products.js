const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Products", productSchema);
