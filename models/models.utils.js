const db = require("../db/connection");
const format = require("pg-format");

const checkQuery = async (table, column, value) => {
  const queryStr = format(`SELECT * FROM %I WHERE %I = $1;`, table, column);
  const dbResults = await db.query(queryStr, [value]);

  if (dbResults.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
};

module.exports = checkQuery;
