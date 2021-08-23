const Router = require('express');
const router = new Router();
const katalogController = require('../controllers/katalog.controllers');

router.post('/katalog',katalogController.createKatalog);
router.get('/katalog',katalogController.getKatalogs);
router.put('/katalog',katalogController.updateKatalog);
router.delete('/katalog/:id',katalogController.deleteKatalog);

module.exports =router;