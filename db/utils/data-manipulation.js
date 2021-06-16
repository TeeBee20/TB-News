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
    const votes = !article.votes ? 0 : article.votes;
    return [
      article.title,
      article.body,
      votes,
      article.topic,
      article.author,
      article.created_at,
    ];
  });

  return articleValues;
};

exports.createArticleId = (articleResult) => {
  const articleObj = {};

  articleResult.forEach((article) => {
    return (articleObj[article.title] = article.article_id);
  });

  return articleObj;
};

exports.formatCommentData = (commentData, articleObj) => {
  const commentValues = commentData.map((comment) => {
    const votes = !comment.votes ? 0 : comment.votes;
    return [
      comment.created_by,
      articleObj[comment.belongs_to],
      votes,
      comment.created_at,
      comment.body,
    ];
  });

  return commentValues;
};
