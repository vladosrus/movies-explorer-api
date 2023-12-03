const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');

const NotFoundError = require('../errors/notFoundError');
const { createUser, login, logout } = require('../controllers/users');
const {
  validateSignUpBody,
  validateSignInBody,
} = require('../middlewares/validations');
const { wrongPathErrorMessage } = require('../utils/constants');
const auth = require('../middlewares/auth');

router.post('/signin', validateSignInBody, login);
router.post('/signup', validateSignUpBody, createUser);
router.post('/signout', logout);
router.use(auth);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);

// Обработка неправильного пути
router.use((req, res, next) => {
  next(new NotFoundError(wrongPathErrorMessage));
});

module.exports = router;
