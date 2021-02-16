const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const item = new Schema(
  {
    _id: String,
    uid: String,
    title: String,
    component: String,
    collaborators: [{ _id: String, writable: Boolean }],
    email: String,
    password: String,
    domain: String,
    body: String,
    images: [String],
    no: String,
    holder: String,
    cvc: String,
    exp: String,
    no: String,
    name: String,
    holder: String,
    type: String,
    routing: String,
    fullName: String,
    userName: String,
    gender: String,
    dob: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  { timestamps: true }
);
module.exports = Item = mongoose.model("Item", item);
