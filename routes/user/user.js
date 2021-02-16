const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const User = require("../../models/User");
const Token = require("../../models/Token");

router.get("/:email", (req, res) => {
  const { email } = req.params;
  const regex = new RegExp(email, "g");
  User.find({
    email: { $regex: regex, $options: "i" },
  })
    .lean()
    .then((users) => {
      users = users
        .filter((user) => user._id.toString() !== req.uid)
        .map(({ _id, email, name, avatar }) => ({
          _id,
          email,
          name,
          avatar,
        }));
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res._status(500);
    });
});

router.get("/", async (req, res) => {
  const { uid } = req;
  const tokens = await Token.find({ u_id: uid, status: 200 });
  User.find({}).then((users) => {
    const user = users.find(({ _id }) => _id.toString() === uid.toString());
    Item.find({})
      .lean()
      .then((items) => {
        const newItems = {
          sites: [],
          notes: [],
          cards: [],
          banks: [],
          personals: [],
        };
        const ownItems = items.filter(
          (item) => item.uid.toString() === uid.toString()
        );
        const sharedItems = items.filter(
          (item) =>
            item.collaborators.findIndex(
              ({ _id }) => _id.toString() === uid.toString()
            ) >= 0 && true
        );
        ownItems.forEach((item) => {
          const collaborators = item.collaborators.map((collaborator) => {
            const { name, email, avatar } =
              users.find(
                ({ _id }) => _id.toString() === collaborator._id.toString()
              ) || {};
            return { name, email, avatar, ...collaborator };
          });
          item.own = true;
          item.writable = true;
          newItems[item.component].push({ ...item, collaborators });
        });
        sharedItems.forEach((item) => {
          const collaborators = item.collaborators.map((collaborator) => {
            const { name, email, avatar } =
              users.find(
                ({ _id }) => _id.toString() === collaborator._id.toString()
              ) || {};
            return { name, email, avatar, ...collaborator };
          });

          const { writable } =
            item.collaborators.find(
              ({ _id }) => _id.toString() === uid.toString()
            ) || {};
          item.own = false;
          item.writable = writable;
          newItems[item.component].push({ ...item, collaborators });
        });
        res.json({
          user,
          sessions: tokens,
          items: newItems,
        });
      })
      .catch((err) => {
        console.log(err);
        res._status(500);
      });
  });
});

router.put("/", (req, res) => {
  const { uid, body } = req,
    { user } = body;
  User.findByIdAndUpdate(uid, { ...user })
    .then((item) => res._status(200))
    .catch(() => res._status(500));
});

module.exports = router;
