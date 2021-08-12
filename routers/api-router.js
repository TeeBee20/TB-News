const { getTopics, seedController } = require("../controllers/controllers");
const apiRouter = require("express").Router();
const articlesRouter = require("../routers/articles-router");

apiRouter.use("/articles", articlesRouter);
apiRouter.get("/", getEndpoints);
apiRouter.get("/topics", getTopics);
apiRouter.get("/seed", seedController);

module.exports = apiRouter;
