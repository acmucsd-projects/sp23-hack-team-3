const Event = require('../models/eventModel.js');
const mongoose = require('mongoose');

const getEvents = async (req, res) => {
    const events = await Event.find({}).sort({
        createdAt: -1
    })
    for (x in events)
    {
        delete events[x].owner;
    }
    res.status(200).json(events)
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
    try 
    {
        await Event.create(EventObject);
    }
    catch (error) {
        res.status(404).json({message: `Error in event creation: ${error.message}`});
    }
    res.status(201).json({message: "Successful event creation"});
}

const deleteEvent = async (req, res) => {
    const {
        id
    } = req.params
    try 
    {
        await Event.findByIdAndRemove(id);
    }
    catch (error) {
        res.status(404).json({message: `Error in event deletion: ${error.message}`});
    }
    res.status(201).json({message: "Successful event deletion"});
}

const updateEvent = async (req, res) => {
    const {
        id
    } = req.params
    const newEventInfo = req.body;
    try 
    {
        await Event.findOneAndUpdate({ "_id": id }, { "$set": newEventInfo});  
    }
    catch (error) {
        res.status(404).json({message: `Error in event update: ${error.message}`});
    }
    res.status(200).json({message: "Successful event update"});
}
//creating event to db collection
// async function createEvent(EventObject) {
//     try 
//     {
//         await Event.create(EventObject);
//     }
//     catch (error) {
//         throw new Error(`Error in event creation: ${error.message}`);
//     }
// }

// async function grabAllEvents() {
//     try 
//     {
//         const allEvents = await Event.find({});
//         return allEvents
//     }
//     catch (error) {
//         throw new Error(`Error in event creation: ${error.message}`);
//     }
// }

// async function grabEvent(eventId)
// {
//     try 
//     {
//         const singleEvent = await Event.find({ _id: eventId });
//         return singleEvent
//     }
//     catch (error) {
//         throw new Error(`Error in grabbing single event: ${error.message}`);
//     }
// }

// async function deleteEvent(eventId)
// {
//     try 
//     {
//         await Event.findByIdAndRemove(eventId);
//     }
//     catch (error) {
//         throw new Error(`Error in grabbing single event: ${error.message}`);
//     }
// }

// async function updateEvent(eventId, newEventInfo)
// {
//     try 
//     {
//         await Event.findOneAndUpdate({ "_id": eventId }, { "$set": newEventInfo});  
//     }
//     catch (error) {
//         throw new Error(`Error in updating event: ${error.message}`);
//     }
// }

module.exports = { getEvents, getEvent, createEvent, deleteEvent, updateEvent };