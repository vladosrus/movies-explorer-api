const router = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { validateUpdateUserBody } = require('../middlewares/validations');

router.get('/me', getUser);
router.patch('/me', validateUpdateUserBody, updateUser);

module.exports = router;
