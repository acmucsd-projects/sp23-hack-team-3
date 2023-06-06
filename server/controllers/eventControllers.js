const Event = require('../models/eventModel.js');
const Organization = require('../models/organizationModel');
const mongoose = require('mongoose');

const getEvents = async (req, res) => {
    const events = await Event.find({}).sort({
        createdAt: -1
    })
    
    res.status(200).json(events);
}

const getEvent = async (req, res) => {
    const {
        id
    } = req.params
    const event = await Event.findById(id)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
        })
    }
    if (!event) {
        return res.status(404).json({
            error: 'No such user'
        })
    }
    res.status(200).json(event)
}

const createEvent = async (req, res) => {
    const EventObject = req.body;
    // console.log("YOOOOOOO");
    // console.log(req.body);
    try 
    {
        //we first grab orgID associated with req.user._id, then attach to eventobject
        //const org = await Organization.find({ "userID": req.user._id});

        // EventObject.orgID = org[0]._id;
        EventObject.orgID = "6466d538b8554d8cf0783e58";
        await Event.create(EventObject);
    }
    catch (error) {
        //console.log(error.message);
        return res.status(404).json({message: `Error in event creation: ${error.message}`});
    }
    return res.status(201).json({message: "Successful event creation"});
}

const deleteEvent = async (req, res) => {
    const {
        id
    } = req.params

    try 
    {
        //we have event's ID
        //grab orgID from event
        //with orgID, find Organization
        //does org's userID array contain req.user._id? 
        //if so, we can delete
        //if not, or org just doesn't exist, we do not delete and say permissions aren't valid

        const targetEvent = await Event.findById(id);
        const orgID = targetEvent.orgID;
        const targetOrg = await Organization.findById(mongoose.Types.ObjectId(orgID));
        if (!targetOrg || !targetOrg.userID.includes(req.user._id))
        {
            throw new Error("You don't have permissions to delete this event");
        }
        await Event.findByIdAndRemove(id);
    }
    catch (error) {
        return res.status(404).json({message: `Error in event deletion: ${error.message}`});
    }
    return res.status(201).json({message: "Successful event deletion"});
}

const updateEvent = async (req, res) => {
    const {
        id
    } = req.params
    const newEventInfo = req.body;
    try 
    {
        //we have event's ID
        //grab orgID from event
        //with orgID, find Organization
        //does org's userID array contain req.user._id? 
        //if so, we can update
        //if not, or org just doesn't exist, we do not update and say permissions aren't valid
        const targetEvent = await Event.findById(id);
        const orgID = targetEvent.orgID;
        const targetOrg = await Organization.findById(mongoose.Types.ObjectId(orgID));
        if (!targetOrg || !targetOrg.userID.includes(req.user._id))
        {
            throw new Error("You don't have permissions to update this event");
        }

        await Event.findOneAndUpdate({ "_id": id }, { "$set": newEventInfo});  
    }
    catch (error) {
        return res.status(404).json({message: `Error in event update: ${error.message}`});
    }
    return res.status(200).json({message: "Successful event update"});
}

module.exports = { getEvents, getEvent, createEvent, deleteEvent, updateEvent };