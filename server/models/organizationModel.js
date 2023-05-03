const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema(
    {
        owners: {
            type: [UserSchema],
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        socials: {
            type: [String],
            required: true,
        },
    }
);

const Organization = new mongoose.model('Organization', OrganizationSchema);
module.exports = Organization;