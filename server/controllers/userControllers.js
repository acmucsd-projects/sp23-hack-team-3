const User = require('../models/userModel.js');
const Organization = require('../models/organizationModel.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// const getUserInfo = async (req, res) => {

// }
const registerUser = async (req, res) => {
    const UserObject = req.body;
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
        
        //add user and org to respective User and Organization collections
        //ENCRYPT THE PASSWORD
        const hashedPassword = await bcrypt.hash(req.body.password, 13);
        UserObject.password = hashedPassword;
        const createdResult = await User.create(UserObject);
        // console.log(createdResult);
        const orgObject = {orgName: UserObject.organization, userID: [createdResult._id], socials: []};
        // console.log(orgObject);
        await Organization.create(orgObject);
    }
    catch (error) {
        return res.status(404).json({message: `Error in event creation: ${error.message}`});
    }
    return res.status(201).json({message: "Success. User registered"});
}

module.exports = { registerUser };