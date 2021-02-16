const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const composeMail = require('./composeMail');
router.post('/', async (req, res) => {
  const { body } = req,
    { name, email, password, reminder = '' } = body;
  const newUser = new User({
    name,
    email,
    password,
    reminder,
  });
  newUser
    .save()
    .then(user => {
      const code = req.generateCode(user.secret),
        msg = {
          to: user.email,
          ...composeMail({
            type: 'ACCOUNT_VERIFICATION',
            code,
            user: user.name,
          }),
        };
      res
        .mail(msg)
        .then(() => res.json({ email: user.email }))
        .catch(() => res._status(500));
    })
    .catch(({ code }) => (code == 11000 ? res._status(409) : res._status(500)));
});

module.exports = router;
