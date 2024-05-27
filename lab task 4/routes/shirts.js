const express = require("express");
const router = express.Router();
// const productmodel = require("../Models/shirt");
// const productmodel = require("../Models/poloShirts");
const productmodel = require("../Models/product");

// Define a route to get all shirts
router.get("/", async (req, res) => {
  try {
    console.log("shirt req is", req);
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not specified
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // const referrer = req.get("referrer");
    // console.log(referrer);
    // const referrerPath = new URL(referrer).pathname;
    // console.log(referrerPath);

    if (req.baseUrl == "/shirts") {
      const data = await productmodel
        .find({ id: 1 })
        .limit(limitNumber)
        .skip((pageNumber - 1) * limitNumber);
      const totalItems = await productmodel.find({ id: 1 }).countDocuments();
      const totalPages = Math.ceil(totalItems / limitNumber);

      res.render("shirts", {
        data,
        baseUrl: req.baseUrl,

        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      });
    } else if (req.baseUrl == "/T-shirts") {
      const data = await productmodel
        .find({ id: 2 })
        .limit(limitNumber)
        .skip((pageNumber - 1) * limitNumber);
      const totalItems = await productmodel.find({ id: 2 }).countDocuments();
      const totalPages = Math.ceil(totalItems / limitNumber);

      res.render("shirts", {
        data,
        baseUrl: req.baseUrl,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router; // Export the router
