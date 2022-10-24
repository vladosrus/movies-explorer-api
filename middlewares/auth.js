const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorizedError');
const { unauthorizedErrorMessage } = require('../utils/constants');

const { JWT_SECRET_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  if (!token) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
    return;
  }

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
    return;
  }

  req.user = payload;

  next();
};
