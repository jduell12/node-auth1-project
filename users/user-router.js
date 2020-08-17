const express = require("express");
const router = express.Router();

const Users = require("./users-model");

router.get("/", (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
