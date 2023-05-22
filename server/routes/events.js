const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllers.js');

//actual routing, revamped (following charvi example code)
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.createEvent);
router.delete('/:id', eventController.deleteEvent);
router.patch('/:id', eventController.updateEvent);


module.exports = router;