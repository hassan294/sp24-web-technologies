const mongoose = require("mongoose");

const poloShirt = new mongoose.Schema({
  product_id: { type: Number, default: 1 },
  title: String,
  imageUrl: String,
  sizes: String,
  comparePrice: String,
});
let poloshirtmodel = mongoose.model("Poloshirt", poloShirt);

module.exports = poloshirtmodel;
