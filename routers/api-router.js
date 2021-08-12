const { getTopics } = require("../controllers/controllers");

const apiRouter = require("express").Router();

apiRouter.get("/", getEndpoints);
apiRouter.get("/topics", getTopics);

module.exports = apiRouter;
