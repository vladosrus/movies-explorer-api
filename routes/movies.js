const router = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateMovieId,
  validateMovieBody,
} = require('../middlewares/validations');

router.get('/', getMovies);
router.post('/', validateMovieBody, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
