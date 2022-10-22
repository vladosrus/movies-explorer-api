const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BadRequestError = require('../errors/badRequestError');
const UnauthorizedError = require('../errors/unauthorizedError');
const {
  badRequestErrorMessage,
  invalidEmailOrPasswordMessage,
} = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(email) {
          const regex = /^[a-z0-9-_.]+?@[a-z]+\.[a-z]+/i;

          return regex.test(email);
        },
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  if (!email || !password) {
    throw new BadRequestError(badRequestErrorMessage);
  }

  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(invalidEmailOrPasswordMessage);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(invalidEmailOrPasswordMessage);
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
