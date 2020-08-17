const db = require("../data/db-config");

module.exports = {
  addUser,
  getUsers,
  getUserById,
};

function addUser(user) {
  try {
    const [id] = db("users").insert(user, "id");
    return getUserById(id);
  } catch (err) {
    throw error;
  }
}

function getUsers() {
  return db("users").select("id", "username", "password").orderBy("id");
}

function getUserById(id) {
  return db("users").where({ id }).first();
}
