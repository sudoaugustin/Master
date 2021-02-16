const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const token = new Schema(
  {
    u_id: String,
    OS: String,
    IP: String,
    city: String,
    country: String,
    gateway: String,
    browser: String,
    status: {
      type: Number,
      default: 403,
    },
  },
  { timestamps: true }
);
module.exports = Token = mongoose.model("Token", token);
