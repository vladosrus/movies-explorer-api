const router = require('express').Router();

const auth = require('../middlewares/auth');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateMovieId,
  validateMovieBody,
} = require('../middlewares/validations');

router.get('/', auth, getMovies);
router.post('/', auth, validateMovieBody, createMovie);
router.delete('/:movieId', auth, validateMovieId, deleteMovie);

module.exports = router;
