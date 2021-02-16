const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mail = config.get("mail");
const db = config.get("mongodbURL");
const speakeasy = require("speakeasy");
const app = express();
const port = 5000; //process.env.PORT
const auth = require("./routes/auth");
const user = require("./routes/user");
const requestIp = require("request-ip");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: mail,
});

app.use(requestIp.mw());
app.use(bodyParser.json({ limit: "50mb" }));

app.use((req, res, next) => {
  res._status = (v) => res.status(v).end();
  res.mail = (msg) =>
    new Promise((res, rej) => {
      msg.from = mail.user;
      transporter.sendMail(msg, (err, info) => (err ? rej(err) : res(info)));
    });
  req.generateCode = (secret) =>
    speakeasy.totp({
      secret: secret,
      encoding: "base32",
    });
  req.verifyCode = ({ secret, code }) =>
    speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: code,
      window: 4,
    });
  next();
});

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => console.log(err));
// app.use("/user",user);
app.use("/auth", auth);
app.use("/app", user);
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log("Server Started on " + port));
