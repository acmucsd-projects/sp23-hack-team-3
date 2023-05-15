console.log('Loading users schema...');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            // unique: true,
            // required: 'Email address is required',
            // validate: [validateEmail, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        organizations: {
            type: [OrgSchema],
            required: true,
        }
    }
);

const User = new mongoose.model('User', UserSchema);
module.exports = User;