require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Models require
// const shirtmodel = require("./Models/shirt");

// Routes require
const HomeRoutes = require("./routes/Homepage.js");
const shirtRoutes = require("./routes/shirts");
// const poloshirtRoutes = require("./routes/t-shirt.js");
const productDetailsRoutes = require("./routes/product.js");
const cartRoutes = require("./routes/cart.js");
const loginRoutes = require("./routes/login.js");
const signupRoutes = require("./routes/signup.js");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.set("view engine", "ejs");
server.use(express.static(path.join(__dirname, "public")));

// Mongoose connection
mongoose
  .connect("mongodb://127.0.0.1:27017/project")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

// Routes
server.use("/shirts", shirtRoutes);
server.use("/T-shirts", shirtRoutes);
server.use("/data", productDetailsRoutes);
server.use("/cart", cartRoutes);
server.use("/", HomeRoutes);

server.use("/login", loginRoutes);

server.use("/signup", signupRoutes);

// Start server
server.listen(3000, () => {
  console.log("Server started at localhost:3000");
});
