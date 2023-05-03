const mongoose = require('mongoose');

//found this online, will use later maybe for email validation??
// const validateEmail = function(email) {
//     //var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     var regex = new RegExp('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/');
//     return regex.test(email)
// };

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
            type: [OrganizationSchema],
            required: true,
        }
    }
);

const User = new mongoose.model('User', UserSchema);
module.exports = User;
