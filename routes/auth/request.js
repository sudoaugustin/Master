const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const composeMail = require("./composeMail");
router.post("/", (req, res) => {
  const { email, type, lang } = req.body;
  let code, reminder;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        switch (type) {
          case "ACCOUNT_VERIFICATION":
          case "2FA_VERIFICATION":
          case "CHANGE_PASSWORD":
            code = req.generateCode(user.secret);
            break;
          case "REMINDER":
            reminder = !user.reminder ? res._status(400) : user.reminder;
            break;
          default:
            break;
        }
        const msg = {
          to: user.email,
          ...composeMail({ type, code, reminder, user: user.name }),
        };
        res
          .mail(msg)
          .then(() => res._status(200))
          .catch(() => res._status(500));
      } else res._status(404);
    })
    .catch(() => res.status(500));
});

module.exports = router;
