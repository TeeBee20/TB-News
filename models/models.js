const db = require("../db/connection");
const { checkQuery, checkExists } = require("./models.utils");
const format = require("pg-format");

exports.selectTopics = async () => {
  const result = await db.query(`SELECT * FROM topics;`);

  if (!result) {
    return Promise.reject({ status: 404, msg: "not found" });
  }

  return result;
};

exports.selectArticleById = async (articleId) => {
  const articles = await db.query(
    `SELECT articles.*, 
    COUNT(comment_id) :: INT AS comment_count 
    FROM articles 
    LEFT JOIN comments 
    ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id;`,
    [articleId]
  );

  if (articles.rows.length === 0) {
    checkExists("articles", "article_id", articleId).catch((err) => {
      return Promise.reject(err);
    });
  }

  return articles.rows;
};

exports.updateArticleVotesById = async (articleId, newVotes) => {
  const updatedArticle = await db.query(
    `UPDATE articles
  SET 
  votes = votes + $1
  WHERE article_id = $2
  RETURNING *;`,
    [newVotes, articleId]
  );
  const articleWithVotes = await db.query(
    `SELECT articles.*, 
  COUNT(comment_id) :: INT AS comment_count 
  FROM articles 
  LEFT JOIN comments 
  ON comments.article_id = articles.article_id
  WHERE articles.article_id = $1 
  GROUP BY articles.article_id;`,
    [articleId]
  );

  return articleWithVotes.rows;
};
