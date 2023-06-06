const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllers.js');
const sessionHandler = require('../auth/session.js');

//actual routing, revamped (following charvi example code)
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.get('/profile', /*sessionHandler.ensureAuthenticated, */eventController.getProfileEvents);
router.post('/',  sessionHandler.ensureAuthenticated, eventController.createEvent);


//DONT ADD THESE ROUTES UNTIL AUTHENTICATION PROPERLY SETUP (DO IT LATER)
//router.delete('/:id', eventController.deleteEvent);
//router.patch('/:id', eventController.updateEvent);


module.exports = router;