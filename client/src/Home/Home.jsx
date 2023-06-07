import Navbar from '../Component/Navbar';
import EventCard from "../Component/Card"
import "./Home.css";
import MapSection from '../Map/Map'
import { useState, useEffect } from "react";
import API from '../API.js';
import Cookies from 'js-cookie'
// import { useLocation } from 'react-router-dom';

const center = {
    lat: 32.8801,
    lng: -117.2340,
}

export default function Home() {

    // const location = useLocation();
    // let loggedIn = false; 

    // if (location.state && location.state.loggedIn) {
    //     loggedIn = location.state.loggedIn;
    // }

    
    const [eventData, setEventData] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    
    function stringToDate(inputDate) {
        let date = new Date(inputDate);
        // remove the seconds
        const dateString =`${date.toLocaleDateString()}, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        return dateString;
    }

    function handleEndTime(date2) {
        const date = new Date(date2);
        // console.log(date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }
    

    useEffect(() => {
        

        const handleCookieLogic = () => {
            console.log("cookie in Post: ", Cookies.get('connet.sid'))
            console.log("not cookie: ", !Cookies.get('connet.sid'))
            if( Cookies.get('connect.sid') != undefined ){
                setLoggedIn(true)
            }
          };
      
        // Wait for the DOM content to load
        document.addEventListener('DOMContentLoaded', handleCookieLogic);
      
        API.getEvents().then((response) => {
        setEventData(response.data);
        });
        
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('DOMContentLoaded', handleCookieLogic);
        };
    }, []);

    console.log("loggedIn: ", loggedIn);
    console.log(Cookies.get('connect.sid') != undefined) 

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
                            flyer={e.flyer}
                            description={e.description}
                            tags={e.tags}
                            organization={e.organization}
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
