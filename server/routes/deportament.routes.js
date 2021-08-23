const Router = require('express');
const router = new Router();
const deportamentController = require('../controllers/deportament.controllers');

router.post('/deportament',deportamentController.createDeportament);
router.get('/deportament',deportamentController.getDeportaments);
router.put('/deportament',deportamentController.updateDeportament);
router.delete('/deportament/:id',deportamentController.deleteDeportament);



module.exports =router;