const Movie = require('../models/movie');

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .orFail(new NotFoundError('Объект c указанным _id не найден'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.remove(movie)
          .then(() => res.send({ message: 'Фильм удален' }))
          .catch(next);
      } else {
        next(new ForbiddenError('Нельзя удалять чужие фильмы'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
