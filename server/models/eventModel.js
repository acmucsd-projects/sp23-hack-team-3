const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema (
    
    {
        name: {
            type: String,
            required: true,
        },
        orgs : {
            type: [String],
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        description: {
            type : String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        tags: {
            type : [String],
            required: false,
        },
        photo: {
            type : String,
            required: false,
        }
        
    }
);

const Event = new mongoose.model('Event', EventSchema, "Event");
module.exports = Event;