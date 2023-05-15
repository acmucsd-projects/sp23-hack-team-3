console.log('Loading organizations schema...');
const mongoose = require('mongoose');

const OrgSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    admin: {
        type: [String], // want to change to userSchema
        required: true
    },
    orgName: {
        type: String,
        required: true,
    },
    socials: {
        type: [String],
    },
    events: {
        type: [String], // want to change to eventsSchema
        required: true,
    }
})

const organization = mongoose.model('Organization', OrgSchema);

module.exports = organization;