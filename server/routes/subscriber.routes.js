const Router = require('express');
const router = new Router();
const subscriberController = require('../controllers/subscriber.controllers');

router.post('/subscriber',subscriberController.createSubscriber);
router.get('/subscriber',subscriberController.getSubscribers);
router.put('/subscriber',subscriberController.updateSubscriber);
router.delete('/subscriber/:id',subscriberController.deleteSubscriber);

module.exports =router;