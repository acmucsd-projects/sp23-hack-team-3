console.log('Loading organizations schema...');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrgSchema = new Schema({
    orgName: {
        type: String,
        required: true,
    },
    admin: {
        type: [String],
        required: true,
    },
    socials: {
        type: [String],
        required: true,
    },
    events: {
        type: [String],
        required: true,
    }
})

module.exports = mongoose.model('Organization', OrgSchema);