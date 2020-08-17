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
      res.json({ err: err.message });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    Users.getUsersBy({ username }).then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        res.status(200).json({ message: "logged in" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/logout", (req, res) => {
  if (req.session && req.session.loggedIn) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ message: "logged out sucessfully" });
      }
    });
  } else {
    res.status(200).json({ message: "you were not logged in" });
  }
});

module.exports = router;
