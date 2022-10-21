const Movie = require('../models/movie');

const createMovie = (req, res) => {
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
    .catch((err) => res.send(err));
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports = {
  createMovie,
  getMovies,
};
