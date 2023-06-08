const Event = require('../models/eventModel.js');
const Organization = require('../models/organizationModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();


Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}
//setup
const { S3Client, PutObjectCommand, GetObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');  

//actual controllers
const getEvents = async (req, res) => {
    const events = await Event.find({}).sort({
        //createdAt: -1
        'date': 1
    })
    for (x in events)
    {
        if (events[x].flyer!="logo512.png")
        {
            const getObjectParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: events[x].flyer
            }

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, {expiresIn: 3600});
            events[x].flyer=url;
        }
    }
    
    return res.status(200).json(events);
}

const getProfileEvents = async (req, res) => {
    const userID = req.user;
    console.log(req.user);
    try 
    {
        // const org = await Organization.find({ "userID": req.user});
        // console.log("org: ", org)

        // const orgID = org[0]._id;
        // console.log("org[0]", org[0])
        // console.log("._id", org[0]._id)

        //now use this orgID to get events!
        const events = await Event.find({"orgID": req.user});

        for (x in events)
        {
            if (events[x].flyer!="logo512.png")
            {
                const getObjectParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: events[x].flyer
                }
    
                const command = new GetObjectCommand(getObjectParams);
                const url = await getSignedUrl(s3, command, {expiresIn: 3600});
                events[x].flyer=url;
            }
        }


        return res.status(200).json(events);

    }
    catch (error) {
        console.log(error)
        console.log(error.message)
        return res.status(400).json({message: `Error in grabbing user's events: ${error.message}`});
    }
}

const createEvent = async (req, res) => {

    const EventObject = JSON.parse(JSON.stringify(req.body));
    EventObject.tags = JSON.parse(EventObject.tags);
    
    EventObject.date = new Date(EventObject.date).addHours(7).toISOString();
    EventObject.date2 = new Date(EventObject.date2).addHours(7).toISOString();
    try 
    {
        //first attempt an image upload!
        EventObject.flyer = "logo512.png";
        if (req.file)
        {
            const randGeneratedImageName = randomImageName();
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: randGeneratedImageName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            }
            const command = new PutObjectCommand(params);
            await s3.send(command);
            EventObject.flyer = randGeneratedImageName;
        }
        

        //we first grab orgID associated with req.user._id, then attach to eventobject
        //since we kinda just got rid of orgs, we comment this out for now 
        // const org = await Organization.find({ "userID": req.user._id});
        // EventObject.orgID = org[0]._id;
        EventObject.orgID = req.user;
        
        
        await Event.create(EventObject);

    }
    catch (error) {
        console.log(error.message);
        return res.status(409).json({message: `Error in event creation: ${error.message}`});
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

        // const targetEvent = await Event.findById(id);
        // const orgID = targetEvent.orgID;
        // const targetOrg = await Organization.findById(mongoose.Types.ObjectId(orgID));
        // if (!targetOrg || !targetOrg.userID.includes(req.user._id))
        // {
        //     throw new Error("You don't have permissions to delete this event");
        // }
        const targetEvent = await Event.findById(id);
        if (targetEvent.orgID != req.user)
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

module.exports = { getEvents, createEvent, getProfileEvents, deleteEvent};