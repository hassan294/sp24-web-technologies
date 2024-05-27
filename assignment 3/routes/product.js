// routes/productDetails.js

const express = require("express");
const router = express.Router();
const Product = require("../Models/product"); // Adjust model import as needed
const Cart = require("../Models/cart");

// Route to handle product details page
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }
    // Render the product details page and pass the product data
    res.render("productDetails", { product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Handle adding items to the cart
router.post("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body.cartdata.split("&");
    console.log("req is ", data[2].split("=")[1]);

    if (data[2].split("=")[1] === "") {
      console.log("no size");
      return res.status(200).json({ message: "please select size" });
    }

    const product = await Product.findById(productId);
    console.log("product is ", product);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const newCartItem = new Cart({
      productId: data[1].split("=")[1],
      UserId: req.body.userid,
      quantity: parseInt(data[0].split("=")[1]),
      size: data[2].split("=")[1],
    });
    console.log("new added item is", data[1].split("=")[1]);

    await newCartItem.save();
    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding item to cart" });
  }
});

module.exports = router;
