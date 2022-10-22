const router = require('express').Router();

const auth = require('../middlewares/auth');
const { getUser, updateUser } = require('../controllers/users');
const { validateUpdateUserBody } = require('../middlewares/validations');

router.get('/me', auth, getUser);
router.patch('/me', auth, validateUpdateUserBody, updateUser);

module.exports = router;
