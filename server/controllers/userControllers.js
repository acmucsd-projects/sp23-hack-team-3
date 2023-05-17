const User = require('../models/userModel.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const UserObject = req.body;
    UserObject.orgs = [];
    //1. make sure email doesn't already exist
    //2. add user to collection!
    try 
    {
        const found = await User.findOne({ email: UserObject.email});
        if (found)
        {
            console.log(found);
            return res.status(409).json({message: `Account already exists with email: ${UserObject.email}`});
        }
        //add user to collection
        //TODO ENCRYPT THE PASSWORD
        const hashedPassword = await bcrypt.hash(req.body.password, 13);
        UserObject.password = hashedPassword;
        await User.create(UserObject);
    }
    catch (error) {
        return res.status(404).json({message: `Error in event creation: ${error.message}`});
    }
    return res.status(201).json({message: "Success. User registered"});
}

const loginUser = async (req, res) => {

}

module.exports = { registerUser, loginUser };