// routes/homepage.js
const express = require("express");
const { User, validate } = require("../Models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Define a route to render the signup form
router.get("/", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Define a route to handle the signup form submission
router.post("/", async (req, res) => {
  try {
    // Check if the user with the provided email already exists
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res
        .status(409)
        .send({ message: "User with given email already exists" });

    // Validate the request body
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Check password complexity
    if (req.body.password.length < 8) {
      return res.status(400).send({
        message: "Password should be at least 8 characters long",
      });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user with hashed password
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
