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

router.put("/:cartItemId", async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;
    console.log("update id is ", cartItemId, " with quantity ", quantity);
    await Cart.updateOne({ _id: cartItemId }, { $set: { quantity } });
    res.status(200).json({ message: "Item updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// New GET route for searching items by name
router.get("/:id/search", async (req, res) => {
  try {
    const UserId = req.params.id;
    const searchQuery = req.query.q;
    console.log("user id is ", UserId);
    console.log("search is ", searchQuery);
    const data1 = await Cart.find({ UserId })
      .populate({
        path: "productId",
        match: { title: { $regex: searchQuery, $options: "i" } },
      })
      .exec();
    const data = data1.filter((item) => item.productId !== null);

    console.log("data is", data);
    res.render("cart", { data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
