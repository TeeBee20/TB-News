const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../data/test-data/index");
const {
  formatTopicData,
  formatUserData,
  formatArticleData,
  formatCommentData,
  createArticleId,
} = require("../utils/data-manipulation");
const db = require("../connection.js");
const format = require("pg-format");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;

  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS articles;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS topics;`);

  await db.query(
    `CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY NOT NULL,
      description VARCHAR NOT NULL
    );`
  );

  await db.query(
    `CREATE TABLE users (
      username VARCHAR PRIMARY KEY NOT NULL,
      avatar_url VARCHAR NOT NULL,
      name VARCHAR NOT NULL
    );`
  );

  await db.query(
    `CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );
  await db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body TEXT NOT NULL
    );`);
  console.log("in the seed");

  const topicValues = formatTopicData(topicData);
  const topicInsertStr = format(
    `INSERT INTO topics
    (slug, description)
    VALUES %L RETURNING *;`,

    topicValues
  );

  await db.query(topicInsertStr);

  const userValues = formatUserData(userData);
  const userDataStr = format(
    `INSERT INTO users
      (username, avatar_url, name)
      VALUES %L RETURNING *;`,
    userValues
  );

  await db.query(userDataStr);

  const articleValues = formatArticleData(articleData);
  const articleDataStr = format(
    `INSERT INTO articles
          (title, body, votes, topic, author, created_at)
          VALUES %L RETURNING *;`,
    articleValues
  );

  await db.query(articleDataStr);

  const allFromTable = await db.query("SELECT * FROM articles");
  const results = createArticleId(allFromTable.rows);

  const commentValues = formatCommentData(commentData, results);
  const commentDataStr = format(
    `INSERT INTO comments
       (author, article_id, votes, created_at, body)
       VALUES %L RETURNING *;`,
    commentValues
  );

  await db.query(commentDataStr).catch((err) => console.log(err));
};

module.exports = seed;
