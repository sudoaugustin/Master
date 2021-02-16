const express = require("express");
const app = express();
const Token = require("../../models/Token");
const Item = require("../../models/Item");
const item = require("./item");
const user = require("./user");
app.use((req, res, next) => {
  req.token = req.header("x-auth-token");
  Token.findOne({ _id: req.token })
    .then((token) => {
      if (token) {
        req.uid = token.u_id;
        next();
      } else res._status(404);
    })
    .catch((err) => {
      res._status(500);
    });
});
app.use("/user", user);
app.use("/item", item);
app.delete("/token/:id", (req, res) => {
  Token.findByIdAndDelete(req.params.id)
    .then(() => res._status(200))
    .catch((err) => {
      console.log(err);
      res._status(500);
    });
});
app.get("/extension/:domain", (req, res) => {
  const {
    uid,
    params: { domain },
  } = req;

  Item.find()
    .lean()
    .then((items) => {
      const sites = items.filter(
        (item) =>
          (item.uid.toString() === uid.toString() ||
            item.collaborators.findIndex(
              ({ _id }) => _id.toString() === uid.toString()
            ) >= 0) &&
          domain.includes(item.domain)
      );
      const newItems = JSON.stringify({ sites });
      res.json(newItems);
    })
    .catch((err) => console.log(err));
});
module.exports = app;
