const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/index');
const { isAuthenticated } = require("../middleware/authenticate");

router.use('/', require('./swagger'));

router.get('/books', controller.getAllBooks);
router.get('/games', controller.getAllGames);
router.get('/books/:id', controller.getSingleBook);
router.get('/games/:id', controller.getSingleGame);
router.post('/books', isAuthenticated, controller.createBook);
router.post('/games', isAuthenticated, controller.createGame);
router.put('/books/:id', isAuthenticated, controller.updateBook);
router.put('/games/:id', isAuthenticated, controller.updateGame);
router.delete('/books/:id', isAuthenticated, controller.deleteBook);
router.delete('/games/:id', isAuthenticated, controller.deleteGame);

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
});

module.exports = router;