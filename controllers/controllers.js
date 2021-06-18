const { sort } = require("../db/data/test-data/articles");
const articles = require("../db/data/test-data/articles");
const {
  selectTopics,
  selectAllArticles,
  selectArticleById,
  updateArticleVotesById,
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
    const { sort_by = "date" } = req.query;
    const articles = await selectAllArticles();
    res.status(200).send({ articles: articles });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const article = await selectArticleById(article_id);
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
