const mongoose = require("mongoose");

const transaction = new mongoose.Schema({
  transaction_id: { type: Number, default: 1 },
});
