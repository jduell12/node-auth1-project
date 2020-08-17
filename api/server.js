const express = require("express");

const userRouter = require("../users/user-router");
const server = express();

server.use(express.json());
server.use("/users", userRouter);

server.get("/", (req, res) => {
  res.status(200).json({ server: "up" });
});

module.exports = server;
