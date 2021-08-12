const { sort } = require("../db/data/test-data/articles");
const articles = require("../db/data/test-data/articles");
const seed = require("../db/seeds/seed");
const endpoints = require("../endpoints.json");
const devData = require("../db/data/development-data");
const {
  selectTopics,
  selectAllArticles,
  selectArticleById,
  selectCommentsByArticleId,
  updateArticleVotesById,
  addCommentByArticleId,
} = require("../models/models");

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await selectTopics();
    res.status(200).send({ topics: topics.rows });
  } catch (err) {
    next(err);
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const { sort_by, order, topic } = req.query;
    const articles = await selectAllArticles(sort_by, order, topic);
    res.status(200).send({ articles: articles });
  } catch (err) {
    next(err);
  }
};

exports.getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const comments = await selectCommentsByArticleId(article_id);
    res.status(200).send({ comments: comments });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const [article] = await selectArticleById(article_id);
    console.log(article);
    res.status(200).send({ article: article });
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    const reqObjKeys = Object.keys(req.body);

    if (reqObjKeys.length > 1 || typeof inc_votes !== "number") {
      await Promise.reject({ status: 400, msg: "bad request" });
    }

    const updatedArticle = await updateArticleVotesById(article_id, inc_votes);
    res.status(200).send({ article: updatedArticle });
  } catch (err) {
    next(err);
  }
};

exports.postCommentArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { username, body } = req.body;

    const postedComment = await addCommentByArticleId(
      username,
      article_id,
      body
    );

    res.status(201).send({ comment: postedComment });
  } catch (err) {
    next(err);
  }
};

exports.seedController = (req, res, next) => {
  seed(devData).then((response) => {
    res.status(200).send({ msg: "Seeded OK" });
  });
};

exports.getEndpoints = (req, res, next) => {
  res.status(200).send({ endpoints: [endpoints] });
};
