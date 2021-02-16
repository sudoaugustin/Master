const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const speakeasy = require("speakeasy");
const Schema = mongoose.Schema;
const user = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 20,
    },
    avatar: String,
    reminder: String,
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      set: (v) => bcrypt.hashSync(v, 10),
      minlength: 8,
    },
    status: {
      type: Number,
      default: 403,
    },
    secret: {
      type: String,
      default: speakeasy.generateSecret({ length: 20 }).base32,
      unique: true,
    },
    enabled_2FA: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("User", user);
