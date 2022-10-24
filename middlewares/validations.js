const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const {
  invalidIdErrorMessage,
  invalidUrlErrorMessage,
  minLengthNameErrorMessage,
  maxLengthNameErrorMessage,
  invalidEmailFieldErrorMessage,
  requiredErrorMessage,
  emptyErrorMessage,
} = require('../utils/constants');

// Проверка корректности id
const idValidator = (value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message(invalidIdErrorMessage);
};

// Проверка корректности url-адреса
const urlValidator = (value, helpers) => {
  const regex = /https?:\/\/(\w{3}.)?[0-9a-z\-.]{1,}\.\w{1,}((\/[a-z0-9-._~:?#[\]@!$&'()*+,;=]{1,}){1,}\/?#?)?/i;
  if (regex.test(value)) {
    return value;
  }
  return helpers.message(invalidUrlErrorMessage);
};

// Параметры валидации поля name
const validateNameField = Joi.string()
  .required()
  .min(2)
  .max(30)
  .trim()
  .messages({
    'string.min': minLengthNameErrorMessage,
    'string.max': maxLengthNameErrorMessage,
    'string.empty': emptyErrorMessage('name'),
    'any.required': requiredErrorMessage('name'),
  });

// Параметры валидации поля email
const validateEmailField = Joi.string()
  .required()
  .trim()
  .email()
  .messages({
    'any.required': requiredErrorMessage('email'),
    'string.empty': emptyErrorMessage('email'),
    'string.email': invalidEmailFieldErrorMessage,
  });

// Параметры валидации поля password
const validatePasswordField = Joi.string()
  .required()
  .trim()
  .messages({
    'any.required': requiredErrorMessage('password'),
    'string.empty': emptyErrorMessage('password'),
  });

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom(idValidator),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string()
      .required()
      .trim()
      .messages({
        'any.required': requiredErrorMessage('country'),
        'string.empty': emptyErrorMessage('country'),
      }),
    director: Joi.string()
      .required()
      .trim()
      .messages({
        'any.required': requiredErrorMessage('director'),
        'string.empty': emptyErrorMessage('director'),
      }),
    duration: Joi.number()
      .required()
      .messages({
        'any.required': requiredErrorMessage('duration'),
        'string.empty': emptyErrorMessage('duration'),
      }),
    year: Joi.string()
      .required()
      .trim()
      .messages({
        'any.required': requiredErrorMessage('year'),
        'string.empty': emptyErrorMessage('year'),
      }),
    description: Joi.string()
      .required()
      .trim()
      .messages({
        'any.required': requiredErrorMessage('description'),
        'string.empty': emptyErrorMessage('description'),
      }),
    image: Joi.string()
      .required()
      .custom(urlValidator)
      .trim()
      .messages({
        'any.required': requiredErrorMessage('image'),
        'string.empty': emptyErrorMessage('image'),
      }),
    trailerLink: Joi.string()
      .required()
      .custom(urlValidator)
      .trim()
      .messages({
        'any.required': requiredErrorMessage('trailerLink'),
        'string.empty': emptyErrorMessage('trailerLink'),
      }),
    thumbnail: Joi.string()
      .required()
      .custom(urlValidator)
      .trim()
      .messages({
        'any.required': requiredErrorMessage('thumbnail'),
        'string.empty': emptyErrorMessage('thumbnail'),
      }),
    movieId: Joi.number()
      .required()
      .messages({
        'any.required': requiredErrorMessage('movieId'),
      }),
    nameRU: Joi.string()
      .required()
      .trim()
      .messages({
        'any.required': requiredErrorMessage('nameRU'),
        'string.empty': emptyErrorMessage('nameRU'),
      }),
    nameEN: Joi.string()
      .required()
      .trim()
      .messages({
        'any.required': requiredErrorMessage('nameEN'),
        'string.empty': emptyErrorMessage('nameEN'),
      }),
  }),
});

const validateSignUpBody = celebrate({
  body: Joi.object().keys({
    name: validateNameField,
    email: validateEmailField,
    password: validatePasswordField,
  }),
});

const validateSignInBody = celebrate({
  body: Joi.object().keys({
    email: validateEmailField,
    password: validatePasswordField,
  }),
});

const validateUpdateUserBody = celebrate({
  body: Joi.object().keys({
    name: validateNameField,
    email: validateEmailField,
  }),
});

module.exports = {
  validateMovieId,
  validateMovieBody,
  validateSignUpBody,
  validateSignInBody,
  validateUpdateUserBody,
};
