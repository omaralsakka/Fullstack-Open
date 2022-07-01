const logger = require("./logger");

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformated id" });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
