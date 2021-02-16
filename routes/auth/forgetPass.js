const express = require("express");
const router = express.Router();
const User = require("../../models/User");
router.post("/", (req, res) => {
  const { email, type } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const msg = { to: user.email };
        switch (type) {
          case "CODE":
            const code = req.generateCode(user.secret);
            msg.subject = "Your password reminder is";
            msg.html = `<h1>${code}</h1>`;
            break;
          case "REMINDER":
            !user.reminder
              ? res_status(400)
              : ((msg.subject = "Your password reminder is"),
                (msg.html = `<h1>${user.reminder}</h1>`));
            break;
          default:
            break;
        }
        res
          .mail(msg)
          .then(() => res._status(200))
          .catch(() => res._status(500));
      } else res._status(404);
    })
    .catch(() => res.status(500));
});

router.post("/verify", (req, res) => {
  const { email, code } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const isValid = req.verifyCode({
          secret: user.secret,
          code,
        });
        isValid ? res_status(200) : res_status(401);
      } else res._status(404);
    })
    .catch((err) => res._status(500));
});

module.exports = router;
