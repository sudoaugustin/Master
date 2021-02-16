const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const User = require("../../models/User");

router.get("/", (req, res) => {
  const { uid } = req;
  User.find({}).then((users) => {
    Item.find({ uid })
      .lean()
      .then((items) => {
        const newItems = {
          sites: [],
          notes: [],
          cards: [],
          banks: [],
          personals: [],
        };
        items.forEach((item) => {
          const collaborators = item.collaborators.map((collaborator) => {
            const { name, email, avatar } =
              users.find(
                ({ _id }) => _id.toString() === collaborator._id.toString()
              ) || {};
            return { name, email, avatar, ...collaborator };
          });
          newItems[item.component].push({ ...item, collaborators });
        });
        res.json(newItems);
      })
      .catch((err) => {
        console.log(err);
        res._status(500);
      });
  });
});

router.post("/", (req, res) => {
  const { uid, body } = req,
    { item } = body;
  item.uid = uid;
  Item.create(item)
    .then((item) => res.json(item))
    .catch(() => res._status(500));
});

router.put("/", (req, res) => {
  const { uid, body } = req,
    { item } = body;
  Item.findByIdAndUpdate(item._id, item)
    .then((item) => res._status(200))
    .catch(() => res._status(500));
});

router.delete("/:_id", (req, res) => {
  const { uid, body } = req,
    { _id } = req.params;

  Item.findByIdAndRemove(_id)
    .then((item) => res._status(200))
    .catch((err) => res._status(500));
});

module.exports = router;
