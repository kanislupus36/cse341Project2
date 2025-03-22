const router = require('express').Router();
const controller = require('../controllers/index');

router.use('/', require('./swagger'));

router.get('/');

module.exports = router;