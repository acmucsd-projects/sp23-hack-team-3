const express = require('express');
const router = express.Router();
const Event = require('../models/eventModel.js');

//JUST A TEST QUERY WITH MONGODB, WILL ORGANIZE CRUD OPERATIONS IN CONTROLLERS DIRECTORY LATER
router.get('/', async function(req, res, next) {
    const result = await Event.find();
    if (result){
        console.log(result);
        console.log(typeof(result[0]));
        res.status(200).json({data: result[0]});
    }
    else {
        res.status(404).json({error: "Not Found"});
    }

});

module.exports = router;
