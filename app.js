const express = require("express");
const apiRouter = require("./routers/api-router");
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
  patchArticleById,
} = require("./controllers/controllers");

const app = express();
app.use(express.json());

//refactor to use routers later//
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.patch("/api/articles/:article_id", patchArticleById);

app.all("*", handleInvalidPaths);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
