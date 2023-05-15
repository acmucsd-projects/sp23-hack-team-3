console.log('Loading organizations schema...');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrgSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    admin: {
        type: [Schema.Types.ObjectID],
        ref: 'User',
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
        type: [Schema.Types.ObjectID],
        ref: 'Event',
        required: true,
    }
})

module.exports = mongoose.model('Organization', OrgSchema);