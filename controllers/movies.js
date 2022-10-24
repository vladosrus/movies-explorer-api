const Movie = require('../models/movie');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const {
  forbiddenErrorMessage,
  notFoundErrorMessage,
  badRequestErrorMessage,
  successDeleteFilmMessage,
} = require('../utils/constants');

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .orFail(new NotFoundError(notFoundErrorMessage))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.remove(movie)
          .then(() => res.send({ message: successDeleteFilmMessage }))
          .catch(next);
      } else {
        next(new ForbiddenError(forbiddenErrorMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getUserMovies,
  deleteMovie,
};
