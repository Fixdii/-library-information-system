const Router = require('express');
const router = new Router();
const userController = require('../controllers/book.controllers');

router.post('/book',userController.createBook);
router.get('/book',userController.getBooks);
router.put('/book',userController.updateBook);
router.delete('/book/:id',userController.deleteBook);


module.exports =router;