const router = require('express').Router();

const {
  createMovie,
  getUserMovies,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateMovieId,
  validateMovieBody,
} = require('../middlewares/validations');

router.get('/', getUserMovies);
router.post('/', validateMovieBody, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
