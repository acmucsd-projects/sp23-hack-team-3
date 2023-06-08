import Navbar from '../Component/Navbar';
import EventCard from "../Component/Card"
import "./Home.css";
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import { useState, useEffect } from "react";
import API from '../API.js';
import axios from 'axios'

const Marker = ({ text }) => (
    <div className="pin">
        <Icon icon={locationIcon} style={{ color: 'red', position: 'absolute', translateZ: 0, transform: 'translate(-50%, -100%)' }} height="30" className="pin-icon" />
        <span className="pin-text">{text}</span>
    </div>
)

export default function Home() {

    const [eventData, setEventData] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)

    const [mapCenter, setMapCenter] = useState({
        lat: 32.8801,
        lng: -117.2340,
    })

    const [mapZoom, setMapZoom] = useState(15)

    function stringToDate(inputDate) {
        let date = new Date(inputDate);
        // remove the seconds
        const dateString = `${date.toDateString()}, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
        return dateString;
    }

    function handleEndTime(date2) {
        const date = new Date(date2);
        // console.log(date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
        return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }


    useEffect(() => {

        axios.get('http://localhost:4000/logged', { withCredentials: true })
            .then(response => {
                console.log(response.data.logged)
                if (response.data.logged === true) {
                    setLoggedIn(true)
                }
            })
            .catch(err => {
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
                                    setMapCenter={setMapCenter}
                                    setZoom={setMapZoom}
                                    latitude={e.lat}
                                    longitude={e.lng}
                                    popup={true}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className="map">
                    <div className="google-map">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyADMskMzEIq3kf83pKEnGXCun4s36ugpJU' }}
                            center={mapCenter}
                            zoom={mapZoom}
                        >
                            {
                                eventData.map(e =>
                                    <Marker
                                        lat={e.lat}
                                        lng={e.lng}
                                        text={e.name}
                                    />)
                            }
                        </GoogleMapReact>
                    </div>
                </div>
            </div>

        </>
    )
}
