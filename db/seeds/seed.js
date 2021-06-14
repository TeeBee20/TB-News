const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../data/test-data/index");
const { formatTopicData } = require("../utils/data-manipulation");
const db = require("../connection.js");

const seed = async (data) => {
  const { articleData, commentData, topicData, userData } = data;

  await db.query(`DROP TABLE IF EXISTS topic;`);
  await db.query(`DROP TABLE IF EXISTS user;`);
  await db.query(`DROP TABLE IF EXISTS article;`);
  await db.query(`DROP TABLE IF EXISTS comment;`);

  await db.query(`CREATE TABLE topic (
    slug VARCHAR PRIMARY KEY NOT NULL,
    description VARCHAR NOT NULL
  );`);
  await db.query(`CREATE TABLE user (
    username SERIAL PRIMARY KEY NOT NULL,
    avatar_url VARCHAR NOT NULL,
    name VARCHAR NOT NULL
  );`);
  await db.query(`CREATE TABLE article (
    article_id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR NOT NULL,
    body VARCHAR,
    votes INT DEFAULT 0,
    topic VARCHAR REFERENCES topic(slug),
    author VARCHAR REFERENCES user(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);
  await db.query(`CREATE TABLE comment (
    comment_id SERIAL PRIMARY KEY NOT NULL,
    author VARCHAR REFERENCES user(username),
    article_id INT REFERNCES article(article_id),
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR
  );`);
  //inserting data//
  const topicValues = formatTopicData(topicData);
  const topicInsertStr = format(
    `INSERT INTO topic
(slug, description)
VALUES %L RETURNING *;`,
    topicValues
  );
  await db.query(topicInsertStr);
};

module.exports = seed;
