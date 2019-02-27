const express = require("express");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const route = express.Router();

route.post("/", (req, res) => {
  const { firstname, lastname, username, password, department } = req.body;
  if (!firstname || !lastname || !username || !password || !department) {
    res.status(422).json({ message: "All Fields required!" });
  } else {
    const hash = bcrypt.hashSync(password, 14);
    db("users")
      .where({ username })
      .first()
      .then(user => {
        if (user) {
          res
            .status(400)
            .json({ message: "User with username already exists" });
        } else {
          db("users")
            .insert({
              firstname,
              lastname,
              username,
              department,
              password: hash
            })
            .then(result => {
              if (result.rowCount) {
                res
                  .status(201)
                  .json({ success: true, message: "User has been registered" });
              } else {
                res.status(400).json({ message: "Failed to register user " });
              }
            })
            .catch(() => {
              res.status(500).json({ message: "Server Error" });
            });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Server Error" });
      });
  }
});
module.exports = route;
