const express = require("express");
const apiRouter = require("./routers/api-router");
const cors = require("cors");
const {
  handleServerErrors,
  handleInvalidPaths,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./controllers/errors");
const {
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  patchArticleById,
  seedController,
} = require("./controllers/controllers");

const app = express();
app.use(cors());
app.use(express.json());

//refactor to use routers later//
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.patch("/api/articles/:article_id", patchArticleById);

app.all("*", handleInvalidPaths);
app.get("/api/seed", seedController);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
