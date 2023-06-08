import Navbar from '../Component/Navbar';
import EventCard from "../Component/Card"
import "./Home.css";
import MapSection from '../Map/Map'
import { useState, useEffect } from "react";
import API from '../API.js';
import axios from 'axios'

const center = {
    lat: 32.8801,
    lng: -117.2340,
}

export default function Home() {
    
    const [eventData, setEventData] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    
    function stringToDate(inputDate) {
        let date = new Date(inputDate);
        // remove the seconds
        const dateString =`${date.toDateString()}, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        return dateString;
    }

    function handleEndTime(date2) {
        const date = new Date(date2);
        // console.log(date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }
    

    useEffect(() => {

        axios.get('http://localhost:4000/logged', {withCredentials: true})
        .then( response => {
            console.log(response.data.logged)
            if( response.data.logged === true ){
                setLoggedIn(true)
            }
        })
        .catch( err => {
            console.log("logged: ", err)
        })
      
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
                        eventData.map((e, index) => (
                            <EventCard
                            key={index}
                            title={e.name}
                            date={stringToDate(e.date)}
                            date2={handleEndTime(e.date2)}
                            location={e.location}
                            flyer={e.flyer}
                            description={e.description}
                            tags={e.tags}
                            organization={e.organization}
                            del={false}
                            />
                        ))
                    }
                    </div>
                </div>
                
                <MapSection center={center} zoomLevel={15} latlngData={eventData}/>
            </div>
            
        </>
    )
}
