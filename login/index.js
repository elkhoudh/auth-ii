const express = require("express");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");
const auth = require("../common/authentication");
const route = express.Router();

route.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({ message: "username and password required!" });
  } else {
    db("users")
      .where({ username })
      .first()
      .then(user => {
        if (!user) {
          res.status(404).json({ message: "Invalid credentials" });
        } else {
          const isValid = bcrypt.compareSync(password, user.password);

          if (isValid) {
            auth.genToken(user).then(token => {
              res.status(200).json({
                user: {
                  firstname: user.firstname,
                  lastname: user.lastname,
                  username: user.username
                },
                token
              });
            });
          }
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Server Error" });
      });
  }
});
module.exports = route;
