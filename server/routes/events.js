const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllers.js');
const sessionHandler = require('../auth/session.js');

//actual routing, revamped (following charvi example code)
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', sessionHandler.ensureAuthenticated, eventController.createEvent);
router.delete('/:id', eventController.deleteEvent);
router.patch('/:id', eventController.updateEvent);


module.exports = router;