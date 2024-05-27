const mongoose = require("mongoose");

const catagory = new mongoose.Schema({
  catagory_id: { type: Number, default: 1 },
  catagory_name: String,
  catagory_type: String,
});
