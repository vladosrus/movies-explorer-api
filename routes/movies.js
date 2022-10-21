const router = require('express').Router();

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
