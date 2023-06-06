import Navbar from '../Component/Navbar';
import EventCard from "../Component/Card"
import "./Home.css";
import MapSection from '../Map/Map'
// import eventData from "../event-data.json";
import { useState, useEffect } from "react";
import API from '../API.js';

const center = {
    lat: 32.8801,
    lng: -117.2340,
}

export default function Home() {

    const [loggedIn, isLoggedIn] = useState(true)
    const [eventData, setEventData] = useState([])
    
    function stringToDate(inputDate) {
        let date = new Date(inputDate);
        let dateString = date.toLocaleString("en-US", {
            timeZone: "America/Los_Angeles"
        })
        return dateString;
    }

    useEffect(() => {
        API.getEvents().then((response) => {
            setEventData(response.data);
        });
    }, []);

    return (
        <>

            <Navbar
                loggedIn={loggedIn}
            />
            <div className='home-page'>
                <div className='EventList'>
                    <p>{eventData.length} events</p>
                    <h1>Upcoming Events</h1>
                    <div style={{ marginLeft: "4vw" }}>
                        {
                            eventData.map(e =>
                                <EventCard
                                    title={e.name}
                                    date={stringToDate(e.date)}
                                    flyer={e.flyer}
                                    description={e.description}
                                    tags={e.tags}
                                />)
                        }
                    </div>
                </div>
                
                <MapSection center={center} zoomLevel={15} latlngData={eventData}/>
            </div>
            
        </>
    )
}
