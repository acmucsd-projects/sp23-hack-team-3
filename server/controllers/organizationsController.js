const Organization = require('../models/organizations');
const mongoose = require('mongoose');
const path = require('path');


// get all orgs
const getOrganizations = async (req, res) => {
    const organizations = await Organization.find({}).exec();
    res.status(200).json({organizations});
}

//get a single org
const getOrganization = async (req, res) => {
    const {id} = req.params;
    const organization = await Organization.findById(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({})
    }
    if (!user) {
        return res.status(404).json({
            error: 'No such organization'
        })
    }
    res.status(200).json(organization)
}

const createOrganization = async (req, res) => {
    const newOrg = req.body;
    try {
        await Organization.create(newOrg);
    }
    catch (error) {
        res.status(404).json({message: "error"});
    }
    res.status(200).json({message: "Organization created"});
    // const {organization} = req.body;
    // const {admin, orgName, socials, events} = organization;
    // if (!admin || !orgName || !socials || !events) {
    //     res.status(400).json({error: 'Invalid Input!'});
    // }
    // else {
    //     const newOrganization = await Organization.create(organization);
    //     res.status(200).json({newOrganization});
    // }
}

const deleteOrganizaiton = async (req, res) => {
    const {id} = req.params;
    try {
        await Organization.findByIdAndRemove(id)
        res.status(200).json({message: `Deleted organization with id: ${eventId}`});
    }
    catch(error)
    {
        res.status(400).json({});
    }
}

const updateOrganization = async (req, res) => {
    const {id} = req.params;
    const updatedInfo = req.body;
    try 
    {
        await Event.findOneAndUpdate({ "_id": id }, { "$set": updatedInfo});  
    }
    catch (error) {
        res.status(404).json({});
    }
    res.status(200).json({message: "Update successful"});
}

module.exports = {getOrganizations, getOrganization, createOrganization, deleteOrganizaiton, updateOrganization};