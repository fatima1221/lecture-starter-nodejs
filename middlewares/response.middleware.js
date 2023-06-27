const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  res.sendSuccess = function (data) {
    res.status(200).json(data);
  };

  res.sendError = function (statusCode, message) {
    res.status(statusCode).json({
      error: true,
      message: message,
    });
  };

  res.sendBadRequest = function (message) {
    res.sendError(400, message);
  };

  res.sendNotFound = function (message) {
    res.sendError(404, message);
  };
  next();
};

export { responseMiddleware };
