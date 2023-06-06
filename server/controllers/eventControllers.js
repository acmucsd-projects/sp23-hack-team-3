const Event = require('../models/eventModel.js');
const Organization = require('../models/organizationModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});

const getEvents = async (req, res) => {
    const events = await Event.find({}).sort({
        createdAt: -1
    })
    
    return res.status(200).json(events);
}

const getProfileEvents = async (req, res) => {
    const userID = req.user;
    try 
    {
        const org = await Organization.find({ "userID": req.user});

        const orgID = org[0]._id;
        //now use this orgID to get events!
        const events = await Event.find({"orgID": orgID});
        return res.status(200).json(events);

    }
    catch (error) {
        return res.status(400).json({message: `Error in grabbing user's events: ${error.message}`});
    }
}

const createEvent = async (req, res) => {
    const EventObject = req.body;
    try 
    {
        //we first grab orgID associated with req.user._id, then attach to eventobject
        const org = await Organization.find({ "userID": req.user._id});

        EventObject.orgID = org[0]._id;
        //EventObject.orgID = "6466d538b8554d8cf0783e58";
        await Event.create(EventObject);
    }
    catch (error) {
        return res.status(409).json({message: `Error in event creation: ${error.message}`});
    }
    return res.status(201).json({message: "Successful event creation"});
}

// const deleteEvent = async (req, res) => {
//     const {
//         id
//     } = req.params

//     try 
//     {
//         //we have event's ID
//         //grab orgID from event
//         //with orgID, find Organization
//         //does org's userID array contain req.user._id? 
//         //if so, we can delete
//         //if not, or org just doesn't exist, we do not delete and say permissions aren't valid

//         const targetEvent = await Event.findById(id);
//         const orgID = targetEvent.orgID;
//         const targetOrg = await Organization.findById(mongoose.Types.ObjectId(orgID));
//         if (!targetOrg || !targetOrg.userID.includes(req.user._id))
//         {
//             throw new Error("You don't have permissions to delete this event");
//         }
//         await Event.findByIdAndRemove(id);
//     }
//     catch (error) {
//         return res.status(404).json({message: `Error in event deletion: ${error.message}`});
//     }
//     return res.status(201).json({message: "Successful event deletion"});
// }

// const updateEvent = async (req, res) => {
//     const {
//         id
//     } = req.params
//     const newEventInfo = req.body;
//     try 
//     {
//         //we have event's ID
//         //grab orgID from event
//         //with orgID, find Organization
//         //does org's userID array contain req.user._id? 
//         //if so, we can update
//         //if not, or org just doesn't exist, we do not update and say permissions aren't valid
//         const targetEvent = await Event.findById(id);
//         const orgID = targetEvent.orgID;
//         const targetOrg = await Organization.findById(mongoose.Types.ObjectId(orgID));
//         if (!targetOrg || !targetOrg.userID.includes(req.user._id))
//         {
//             throw new Error("You don't have permissions to update this event");
//         }

//         await Event.findOneAndUpdate({ "_id": id }, { "$set": newEventInfo});  
//     }
//     catch (error) {
//         return res.status(404).json({message: `Error in event update: ${error.message}`});
//     }
//     return res.status(200).json({message: "Successful event update"});
// }


// const getEvent = async (req, res) => {
//     const {
//         id
//     } = req.params
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({
//         })
//     }
//     const event = await Event.findById(id)

//     if (!event) {
//         return res.status(404).json({
//             error: 'No such user'
//         })
//     }
//     res.status(200).json(event)
// }

module.exports = { getEvents, createEvent, getProfileEvents};