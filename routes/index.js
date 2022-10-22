const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');

const NotFoundError = require('../errors/notFoundError');
const { createUser, login, logout } = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);
router.post('/signout', logout);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);

// Обработка неправильного пути
router.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
