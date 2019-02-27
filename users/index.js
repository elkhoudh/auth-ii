const express = require("express");
const db = require("../data/dbConfig");
const auth = require("../common/authentication");
const route = express.Router();

route.get("/", auth.authenticate, (req, res) => {
  db("users")
    .then(users => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({ message: "Server Error" });
    });
});

module.exports = route;
