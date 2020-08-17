const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("../data/db-config");

module.exports = {
  name: "monster",
  secret: "Super secret sentence to keep things secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 30, //30 seconds
    secure: process.env.COOKIE_SECURE || false,
    httpOnly: true,
  },
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60, //deletes expired sessions every hour
  }),
};
