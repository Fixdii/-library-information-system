const Router = require('express');
const router = new Router();
const issuingBooksController = require('../controllers/issuing_books.controllers');

router.post('/issuing',issuingBooksController.createissuingBooks);
router.get('/issuing',issuingBooksController.getissuingBooks);
router.put('/issuing',issuingBooksController.updateissuingBooks);
router.delete('/issuing/:id',issuingBooksController.deleteissuingBooks);



module.exports =router;