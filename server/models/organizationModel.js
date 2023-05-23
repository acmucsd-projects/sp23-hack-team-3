console.log('Loading organizations schema...');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrgSchema = new Schema({
    orgName: {
        type: String,
        required: true,
    },
    userID: {
        type: [String],
        required: true,
    },
    socials: {
        type: [String],
        required: false,
    },
})

module.exports = mongoose.model('Organization', OrgSchema, "Organization");