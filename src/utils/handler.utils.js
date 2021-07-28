exports.errorHandler = (res, err) =>
  res.status(500).send({
    message: err.message || "Error occurred",
  });
  
exports.responseHandler = (res, data) => res.status(200).send(data);
