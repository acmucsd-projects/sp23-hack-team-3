const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel.js');
const eventController = require('../controllers/eventControllers.js');

//JUST A TEST QUERY WITH MONGODB, WILL ORGANIZE CRUD OPERATIONS IN CONTROLLERS DIRECTORY LATER
router.get('/test', async function(req, res, next) {
    const result = await Event.find({name: "Price Center Party"});
    if (result){
        res.status(200).json({data: result[0]});
    }
    else {
        res.status(404).json({error: "Not Found"});
    }
});

//TODO ADD VALIDATION FOR REQ.BODY ON SOME ENDPOINTS
//ALL CRUD OPERATIONS UNDER THESE ENDPOINTS
router.post('/create', async function(req, res, next) {
    const EventObject = req.body;
    try {
        await eventController.createEvent(EventObject);
        res.status(201).json({message: "Successful event creation"});
    }
    catch(err)
    {
        res.status(502).json({error: `Failed to create event: ${err.message}`});
    }
});

module.exports = router;
