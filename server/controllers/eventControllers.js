// const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/eventModel.js');


//creating event to db collection
async function createEvent(EventObject) {
    try 
    {
        await Event.create(EventObject);
    }
    catch (error) {
        throw new Error(`Error in event creation: ${error.message}`);
    }
}

module.exports = { createEvent };