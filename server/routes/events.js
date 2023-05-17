const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventControllers.js');

//actual routing, revamped (following charvi example code)
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.createEvent);
router.delete('/:id', eventController.deleteEvent);
router.patch('/:id', eventController.updateEvent);

//BELOW IS ALL OUTDATED NON STANDARD ROUTING 

//JUST A TEST QUERY WITH MONGODB, WILL ORGANIZE CRUD OPERATIONS IN CONTROLLERS DIRECTORY LATER
// router.get('/test', async function(req, res, next) {
//     const result = await Event.find({name: "Price Center Party"});
//     if (result){
//         res.status(200).json({data: result[0]});
//     }
//     else {
//         res.status(404).json({error: "Not Found"});
//     }
// });

// router.post('/create', async function(req, res, next) {
//     const EventObject = req.body;
//     try {
//         await eventController.createEvent(EventObject);
//         res.status(201).json({message: "Successful event creation"});
//     }
//     catch(err)
//     {
//         res.status(400).json({error: `Failed to create event: ${err.message}`});
//     }
// });

// router.get('/all', async function(req, res, next) {
//     try {
//         const allEvents = await eventController.grabAllEvents();
//         res.status(200).json({data: allEvents});
//     }
//     catch(err)
//     {
//         res.status(400).json({error: `Failed to grab all events: ${err.message}`});
//     }
// });

// router.get('/find', async function(req, res, next) {
//     const eventId = req.query.id;
//     try {
//         const singleEvent = await eventController.grabEvent(eventId);
//         res.status(200).json({data: singleEvent});
//     }
//     catch(err)
//     {
//         res.status(400).json({error: `Failed to find event with id: ${eventId}`});
//     }
// });

// router.delete('/delete', async function(req, res, next) {
//     const eventId = req.query.id;
//     try {
//         await eventController.deleteEvent(eventId);
//         res.status(200).json({message: `Deleted event with id: ${eventId}`});
//     }
//     catch(err)
//     {
//         res.status(400).json({error: `Failed to delete event with id: ${eventId}`});
//     }
// });

// router.patch('/update', async function(req, res, next) {
//     const eventId = req.query.id;
//     const eventInfo = req.body;
//     try {
//         await eventController.updateEvent(eventId, eventInfo);
//         res.status(200).json({message: `Updated event with id: ${eventId}`});
//     }
//     catch(err)
//     {
//         res.status(400).json({error: `Failed to update event with id: ${eventId} Reason: ${err.message}`});
//     }
// });

module.exports = router;