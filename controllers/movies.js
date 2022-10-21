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

const getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => res.send(err));
};

const deleteMovie = (req, res) => {
  Movie.findOne({ _id: req.params.movieId })
    .orFail(new Error())
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.remove(movie)
          .then(() => res.send({ message: 'Фильм удален' }))
          .catch((err) => res.send(err));
      } else {
        throw new Error();
      }
    })
    .catch((err) => res.send(err));
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
