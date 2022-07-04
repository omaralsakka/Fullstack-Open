const logger = require("./logger");

const unknownEndpoint = (request, response) => {
  response.status(400).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformated id" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  logger.error(error.message);
  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
