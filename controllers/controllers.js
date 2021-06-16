const { selectTopics, selectArticleById } = require("../models/models");

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await selectTopics();
    res.status(200).send({ topics: topics.rows });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const article = await selectArticleById(article_id);
    console.log(article.rows);
    res.status(200).send({ article: article.rows });
  } catch (err) {
    next(err);
  }
};
