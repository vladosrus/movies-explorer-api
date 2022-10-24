const {
  internalServerError,
  internalServerErrorMessage,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res
      .status(internalServerError)
      .send({ message: internalServerErrorMessage });
  }
  next();
};
