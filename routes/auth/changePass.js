const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../../models/User");
router.post("/", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) res._status(409);
      else {
        user.password = password;
        user.save().then(() => res._status(200));
      }
    })
    .catch(() => res._status(500));
});

module.exports = router;
