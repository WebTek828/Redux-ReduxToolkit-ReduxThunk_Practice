const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const productsRoute = require("./routes/productRoute");
const cartItemRoute = require("./routes/cartItemRoute");

require("dotenv").config();

app.use("/products", productsRoute);
app.use("/cartItems/", cartItemRoute);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to the database"))
  .catch((err) => console.log(err));

app.listen(5000, function () {
  console.log("Server has started.");
});
