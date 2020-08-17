module.exports = (req, res, next) => {
  if (res.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
