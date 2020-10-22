const cleaner = require("knex-cleaner");
const { clean } = require("knex-cleaner");

function cleanTables(knex) {
  return cleaner
    .clean(knex, {
      mode: "truncate",
      restartIdentify: true, //ask PosreqSQL to reset the primary keys back to 0
      ignoreTables: ["knex_migrations", "knex_migrations_lock"],
    })
    .then(() => {
      console.log("\n== All tables truncated, ready to seed ==\n");
    });
}

exports.seed = function (knex) {
  if (knex.client.config.client === "sqlite3") {
    return knex.raw("PRAGMA foreign_keys = OFF;").then(() => cleanTables(knex));
  } else {
    return cleanTables(knex);
  }
};
