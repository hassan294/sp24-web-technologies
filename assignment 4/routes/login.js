// routes/homepage.js
const express = require("express");
const router = express.Router();
const { User } = require("../Models/user");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

// const shirtmodel = require("../Models/shirt");
// Adjust the path as needed

// Define a route to get all shirts
router.get("/", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    console.log("user id is", user._id);
    if (!user)
      return res.status(400).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res
      .status(200)
      .send({ data: token, id: user._id, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router; // Export the router
