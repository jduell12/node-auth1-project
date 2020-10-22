const db = require("../data/db-config");

module.exports = {
  addUser,
  getUsers,
  getUsersBy,
  getUserById,
};

function addUser(user) {
  try {
    return db("users").insert(user);
  } catch (err) {
    throw error;
  }
}

function getUsers() {
  return db("users").select("id", "username", "password").orderBy("id");
}

function getUsersBy(filter) {
  return db("users").where(filter).orderBy("id");
}

function getUserById(id) {
  return db("users").where({ id }).first();
}
