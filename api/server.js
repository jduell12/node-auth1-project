const express = require("express");

const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");
const server = express();

server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ server: "up" });
});

module.exports = server;
