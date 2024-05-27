const express = require("express");
const router = express.Router();
const Cart = require("../Models/cart");

// Existing GET route
router.get("/:id", async (req, res) => {
  try {
    const UserId = req.params.id;
    const data = await Cart.find({ UserId }).populate("productId").exec();
    res.render("cart", { data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// New DELETE route
router.delete("/:cartItemId", async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;
    console.log("delete id is ", cartItemId);
    await Cart.deleteOne({ _id: cartItemId });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
