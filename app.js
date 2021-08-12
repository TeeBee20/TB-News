const express = require("express");
const app = express();
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
  postCommentArticleId,
  seedController,
  getEndpoints,
} = require("./controllers/controllers");

app.use(cors());
app.use(express.json());
app.set("json spaces", 2);

app.use("/api", apiRouter);
app.all("*", handleInvalidPaths);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
