const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  quantity: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
