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

exports.formatUserData = (userData) => {
  const userValues = userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
  return userValues;
};

exports.formatArticleData = (articleData) => {
  const articleValues = articleData.map((article) => {
    return [
      article.title,
      article.body,
      article.votes,
      article.topic,
      article.author,
      article.created_at,
    ];
  });
  return articleValues;
};

exports.formatCommentData = (commentData, userResults) => {
  console.log(userResults, "<<in formatCommentData");
  const commentValues = commentData.map((comment) => {
    return [
      comment.author,
      comment.article_id,
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
  return commentValues;
};
