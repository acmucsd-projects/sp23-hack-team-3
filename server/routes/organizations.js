console.log('Loading organizations router...');

const express = require('express');
const server = express();

const {
    createOrganization,
    getOrganization,
    getOrganizations,
    deleteOrganizaiton,
    updateOrganization,
} = require('../controllers/organizationsController')

// const Organization = require('../models/organizations');
const router = express.Router();


// GET all orgs 
router.get('/', getOrganizations);

// GET a single org 
router.get('/:id', getOrganization);

// POST a new org 
router.post('/', createOrganization);

// DELETES an org 
router.delete('/:id', deleteOrganizaiton);

// UPDATES an org 
router.patch('/:id', updateOrganization); 

module.exports = router;