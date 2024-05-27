// routes/homepage.js
const express = require("express");
const router = express.Router();
const shirtmodel = require("../Models/shirt"); // Adjust the path as needed

// Define a route to get all shirts
router.get("/", async (req, res) => {
  try {
    res.render("homepage");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router; // Export the router
