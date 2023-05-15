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
    const {id} = req.params
    const organization = await Organization.findById(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
        })
    }
    if (!user) {
        return res.status(404).json({
            error: 'No such organization'
        })
    }
    res.status(200).json(organization)
}

const createOrganization = async (req, res) => {

}

const deleteOrganizaiton = async (req, res) => {

}

const updateOrganization = async (req, res) => {

}

module.exports = {getOrganizations, getOrganization, createOrganization, deleteOrganizaiton, updateOrganization};