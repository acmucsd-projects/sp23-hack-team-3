const Organization = require('../models/organizationModel');
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'})
    }
    const organization = await Organization.findById(id);
    if (!organization) {
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
        res.status(404).json({message: "Error creating organization"});
    }
    res.status(200).json({message: "Organization created"});
}

const deleteOrganizaiton = async (req, res) => {
    const {id} = req.params;
    try {
        await Organization.findByIdAndRemove(id)
        res.status(200).json({message: `Deleted organization with id: ${id}`});
    }
    catch(error)
    {
        res.status(400).json({message: "Error deleting organization"});
    }
}

const updateOrganization = async (req, res) => {
    const {id} = req.params;
    const updatedInfo = req.body;
    try 
    {
        await Organization.findOneAndUpdate({ "_id": id }, { "$set": updatedInfo});  
    }
    catch (error) {
        res.status(404).json({message: "Error updating organization"});
    }
    res.status(200).json({message: "Update successful"});
}

module.exports = {getOrganizations, getOrganization, createOrganization, deleteOrganizaiton, updateOrganization};