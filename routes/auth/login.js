const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Token = require("../../models/Token");
const bcrypt = require("bcrypt");
const composeMail = require("./composeMail");

router.post("/", (req, res) => {
  const { body, clientIp: IP } = req,
    { email, password, OS, ip, city, country, gateway, browser } = body;
  User.findOne({ email })
    .then((user) => {
      if (!user) res._status(404);
      else {
        if (bcrypt.compareSync(password, user.password)) {
          if (user.status === 403) {
            const code = req.generateCode(user.secret);
            const msg = {
              to: user.email,
              ...composeMail({
                code,
                type: "ACCOUNT_VERIFICATION",
                user: user.name,
              }),
            };
            res
              .mail(msg)
              .then(() => res._status(403))
              .catch(() => res._status(500));
          } else {
            const newToken = new Token({
              u_id: user._id,
              OS,
              browser,
              IP: ip || IP,
              city: city || "Yangon",
              country: country || "Myanmar",
              status:
                user.enabled_2FA && gateway !== "Web Extension" ? 403 : 200,
              gateway,
            });
            newToken.save().then((token) => {
              if (token.status === 403 && gateway !== "Web Extension") {
                const code = req.generateCode(user.secret);
                const msg = {
                  to: user.email,
                  ...composeMail({
                    code,
                    type: "2FA_VERIFICATION",
                    user: user.name,
                  }),
                };
                res
                  .mail(msg)
                  .then(() =>
                    res.json({
                      token: token._id,
                      status: token.status,
                    })
                  )
                  .catch(() => res._status(500));
              } else {
                res.json({
                  token: token._id,
                  status: token.status,
                  user: gateway === "Web Extension" && {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                  },
                });
              }
            });
          }
        } else res._status(401);
      }
    })
    .catch(() => res._status(500));
});

module.exports = router;
