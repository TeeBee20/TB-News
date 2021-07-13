const db = require("../db/connection");
const format = require("pg-format");
const { query } = require("../db/connection");

const checkQuery = async (table, column, value) => {
  const queryStr = format(`SELECT * FROM %I WHERE %I = $1;`, table, column);
  const dbResults = await db.query(queryStr, [value]);

  if (dbResults.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }
};

const checkExists = async (table, column, value) => {
  const queryStr = format(`SELECT * FROM %I WHERE %I = $1`, table, column);
  const results = await db.query(queryStr, [value]);

  if (results.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "not found" });
  }

  return results.rows;
};

module.exports = { checkQuery, checkExists };
