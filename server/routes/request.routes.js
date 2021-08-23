const Router = require('express');
const router = new Router();
const requestController = require('../controllers/requests.controllers');

router.get('/books_to_branches',requestController.getBooksToBranches);
router.get('/subscribers_Books',requestController.getSubscribersBooks);
router.get('/return_date_of_books',requestController.getReturnDateOfBooks);


module.exports =router;