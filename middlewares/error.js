const {
  internalServerError,
  internalServerErrorMessage,
} = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res
      .status(internalServerError)
      .send({ message: internalServerErrorMessage });
  }
};
