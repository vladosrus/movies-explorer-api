const router = require('express').Router();

const { createMovie, getMovies } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:movieId');

module.exports = router;
