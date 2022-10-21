const router = require('express').Router();

const { createMovie } = require('../controllers/movies');

router.get('/movies');
router.post('/movies', createMovie);
router.delete('/movies/:movieId');

module.exports = router;
