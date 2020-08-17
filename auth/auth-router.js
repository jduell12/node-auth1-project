const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const rounds = process.env.HASH_ROUNDS || 12;
  const hash = bcrypt.hashSync(password, rounds);

  Users.addUser({ username, password: hash })
    .then((users) => {
      res.status(201).json({ data: users });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

router.post("/login", (req, res) => {});

module.exports = router;
