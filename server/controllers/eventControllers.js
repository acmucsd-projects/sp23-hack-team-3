const Event = require('../models/eventModel.js');


//creating event to db collection
async function createEvent(EventObject) {
    try 
    {
        await Event.create(EventObject);
    }
    catch (error) {
        throw new Error(`Error in event creation: ${error.message}`);
    }
}

async function grabAllEvents() {
    try 
    {
        const allEvents = await Event.find({});
        return allEvents
    }
    catch (error) {
        throw new Error(`Error in event creation: ${error.message}`);
    }
}

async function grabEvent(eventId)
{
    try 
    {
        const singleEvent = await Event.find({ _id: eventId });
        return singleEvent
    }
    catch (error) {
        throw new Error(`Error in grabbing single event: ${error.message}`);
    }
}

async function deleteEvent(eventId)
{
    try 
    {
        await Event.findByIdAndRemove(eventId);
    }
    catch (error) {
        throw new Error(`Error in grabbing single event: ${error.message}`);
    }
}

async function updateEvent(eventId, newEventInfo)
{
    try 
    {
        await Event.findOneAndUpdate({ "_id": eventId }, { "$set": newEventInfo});  
    }
    catch (error) {
        throw new Error(`Error in updating event: ${error.message}`);
    }
}

module.exports = { createEvent, grabAllEvents, grabEvent, deleteEvent, updateEvent };