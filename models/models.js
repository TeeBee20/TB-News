const db = require("../db/connection");
const checkQuery = require("./models.utils");

exports.selectTopics = async () => {
  const result = await db.query(`SELECT * FROM topics;`);

  if (!result) {
    return Promise.reject({ status: 404, msg: "not found" });
  }

  return result;
};

exports.selectArticleById = async (article_id) => {
  const result = await db.query(
    `SELECT *, COUNT() FROM articles WHERE article_id = $1;`,
    [article_id]
  );

  return result;
};
