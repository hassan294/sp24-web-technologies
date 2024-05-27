// routes/shirts.js
const express = require("express");
const router = express.Router();
const poloshirtmodel = require("../Models/poloShirts");

// Define a route to get all shirts
router.get("/", async (req, res) => {
  try {
    const data = await poloshirtmodel.find();
    console.log("t shirt data is", data);
    res.render("t-shirts", { data });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router; // Export the router
