const express = require("express");
const {
  handleServerErrors,
  handleCustomErrors,
  handlePSQLErrors,
} = require("./controllers/errors");
const { getTopics } = require("./controllers/controllers");

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handleServerErrors);

module.exports = app;
