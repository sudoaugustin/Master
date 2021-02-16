const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Token = require("../../models/Token");
router.post("/", (req, res) => {
  const {
    body: { email, code, type, token, OS, ip, city, country, browser },
    verifyCode,
    clientIp: IP,
  } = req;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const { secret } = user,
          isValid = verifyCode({ secret, code });
        if (isValid) {
          switch (type) {
            case "ACCOUNT_VERIFICATION":
              user.status = 200;
              user
                .save()
                .then(() => {
                  const newToken = new Token({
                    u_id: user._id,
                    OS,
                    IP: ip || IP,
                    city: city || "Yangon",
                    country: country || "Myanmar",
                    gateway: "Web App",
                    browser,
                    status: 200,
                  });
                  newToken
                    .save()
                    .then((token) => res.json({ token: token._id }))
                    .catch((err) => res._status(500));
                })
                .catch((err) => res._status(500));
              break;
            case "2FA_VERIFICATION":
              Token.findOne({ _id: token })
                .then((token) => {
                  token.status = 200;
                  token
                    .save()
                    .then((token) => res.json({ token: token._id }))
                    .catch(() => res._status(500));
                })
                .catch(() => res._status(500));
              break;
            default:
              res._status(200);
              break;
          }
        } else res._status(401);
      } else res._status(404);
    })
    .catch(() => res._status(500));
});

module.exports = router;
