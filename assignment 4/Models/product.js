const mongoose = require("mongoose");

const product = new mongoose.Schema({
  product_id: { type: Number, default: 1 },
  title: String,
  imageUrl: String,
  sizes: [String],
  comparePrice: String,
});
let Productmodel = mongoose.model("Product", product);

module.exports = Productmodel;
