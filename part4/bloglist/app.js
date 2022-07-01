const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleWare");

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("connected to Mongodb");
  })
  .catch((error) => {
    logger.error("error connecting to mongodb", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
