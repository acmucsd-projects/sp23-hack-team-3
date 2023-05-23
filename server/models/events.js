const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema (
    
    {
        name: {
            type: String,
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
    },
    {timestamps: true}
);

module.exports = mongoose.model('Event', EventSchema);