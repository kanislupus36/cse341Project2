const router = require('express').Router();
const controller = require('../controllers/index');

router.use('/', require('./swagger'));

router.get('/books', controller.getAllBooks);
router.get('/games', controller.getAllGames);
router.get('/books/:id', controller.getSingleBook);
router.get('/games/:id', controller.getSingleGame);
router.post('/books', controller.createBook);
router.post('/games', controller.createGame);
router.put('/books/:id', controller.updateBook);
router.put('/games/:id', controller.updateGame);
router.delete('/books/:id', controller.deleteBook);
router.delete('/games/:id', controller.deleteGame);

module.exports = router;