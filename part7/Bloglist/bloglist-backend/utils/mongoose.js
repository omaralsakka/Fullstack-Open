const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./logger");

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("connected to Mongodb");
  })
  .catch((error) => {
    logger.error("error connecting to mongodb", error.message);
  });
