const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema (
    
    {
        name: {
            type: String,
            required: true,
        },
        organization : {
            type: String,
            required: true,
        },
        orgID: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        date2: {
            type: String,
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
        lat: {
            type: String,
            required: true,
        },
        lng : {
            type: String,
            required: true,
        },
        tags: {
            type : [String],
            required: false,
        },
        flyer: {
            type : String,
            required: false,
        }
        
    }
);

const Event = new mongoose.model('Event', EventSchema, "Event");
module.exports = Event;