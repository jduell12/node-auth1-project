const express = require("express");
const session = require("express-session");
const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");
const protected = require("../auth/protected");
const sessionConfig = require("./sessionConfig");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", protected, userRouter);
server.use("/api", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ server: "up" });
});

module.exports = server;
