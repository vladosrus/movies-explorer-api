const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const {
  badRequestErrorMessage,
  conflictErrorMessage,
  notFoundErrorMessage,
} = require('../utils/constants');

const { JWT_SECRET_KEY } = require('../utils/config');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(conflictErrorMessage));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: req.body.name, email: req.body.email } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Авторизация прошла успешно', token })
        .end();
    })
    .catch(next);
};

const logout = (req, res, next) => {
  if (req.cookies.jwt) {
    res
      .clearCookie('jwt')
      .send({ message: 'Пользователь покинул систему' })
      .end();
  } else {
    next(new BadRequestError('Сookie отсутствует'));
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  login,
  logout,
};
