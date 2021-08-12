const db = require("../db/connection");
const { checkQuery, checkExists } = require("./models.utils");
const format = require("pg-format");
const { sort } = require("../db/data/test-data/articles");

exports.selectTopics = async () => {
  const result = await db.query(`SELECT * FROM topics;`);

  if (!result.rows) {
    return Promise.reject({ status: 404, msg: "not found" });
  }

  return result.rows;
};

exports.selectAllArticles = async (
  sortBy = "created_at",
  order = "desc",
  topic
) => {
  const validCols = [
    "article_id",
    "title",
    "body",
    "votes",
    "topic",
    "author",
    "created_at",
    "comment_count",
  ];
  const validOrder = ["asc", "desc"];
  const validTopics = [
    "coding",
    "cooking",
    "football",
    "cats",
    "paper",
    "mitch",
  ];

  if (!validCols.includes(sortBy) || !validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  if (topic && !validTopics.includes(topic)) {
    return Promise.reject({ status: 404, msg: "not found" });
  }

  const articles = await db.query(
    `SELECT articles.*, 
  COUNT(comment_id) :: INT AS comment_count 
  FROM articles 
  LEFT JOIN comments 
  ON comments.article_id = articles.article_id GROUP BY articles.article_id
  ORDER BY ${sortBy} ${order.toUpperCase()};`
  );

  if (topic) {
    const resultsByTopic = articles.rows.filter((obj) => {
      return obj.topic === topic;
    });

    return resultsByTopic;
  }

  return articles.rows;
};

exports.selectArticleById = async (articleId) => {
  // if (typeof articleID !== "number") {
  //   return Promise.reject({ status: 400, msg: "bad request" });
  // }

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
    return checkExists("articles", "article_id", articleId);
  }

  return articles.rows;
};

exports.selectCommentsByArticleId = async (articleId) => {
  const comments = await db.query(
    `SELECT * FROM comments WHERE article_id = $1;`,
    [articleId]
  );

  if (comments.rows.length === 0) {
    return checkExists("articles", "article_id", articleId);
  }

  return comments.rows;
};

exports.updateArticleVotesById = async (articleId, newVotes) => {
  if (!newVotes) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  const updatedArticle = await db.query(
    `UPDATE articles
  SET 
  votes = votes + ${newVotes}
  WHERE article_id = $1
  RETURNING *;`,
    [articleId]
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

  if (articleWithVotes.rows.length === 0) {
    return checkExists("articles", "article_id", articleId);
  }

  return articleWithVotes.rows;
};

exports.addCommentByArticleId = async (username, article_id, body) => {
  await checkExists("articles", "article_id", article_id);

  if (!username || !body) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }

  const date = Date.now();
  const timestamp = new Date(date);
  const postedComment = await db.query(
    `INSERT INTO comments (author, article_id, votes, created_at, body) VALUES ($1, $2, 0, $3, $4) RETURNING *;`,
    [username, article_id, timestamp, body]
  );

  return postedComment.rows;
};
