const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

const productsRoute = require("./routes/productRoute");

require("dotenv").config();

app.use("/products", productsRoute);

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
