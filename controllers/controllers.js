const { selectTopics } = require("../models/models");

exports.getTopics = async (req, res, next) => {
  try {
    const topics = await selectTopics();
    res.status(200).send(topics.rows);
  } catch (err) {
    next(err);
  }
};
