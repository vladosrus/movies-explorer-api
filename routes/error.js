const router = require('express').Router();

const requestError = require('../controllers/errors');

router.all('*', requestError);

module.exports = router;
