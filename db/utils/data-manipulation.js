const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../data/test-data/index");

exports.formatTopicData = (topicData) => {
  const topicValues = topicData.map((topic) => {
    return [topic.slug, topic.description];
  });
  return topicValues;
};
