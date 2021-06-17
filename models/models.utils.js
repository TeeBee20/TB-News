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
  console.log(results.rows);
  if (results.rows.length === 0) {
    console.log("here");
    return Promise.reject({ status: 404, msg: "not found" });
  }
};

module.exports = { checkQuery, checkExists };
