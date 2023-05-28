import Navbar from '../Component/Navbar';
import EventCard from "../Component/Card"
import "./Home.css";
import MapSection from '../Map/Map'
import eventData from "../event-data.json";
import { useState } from "react";

const center = {
    lat: 32.8801,
    lng: -117.2340,
}

export default function Home() {

    const [loggedIn, isLoggedIn] = useState(true)
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
                                    title={e.title}
                                    start={e.s_time}
                                    end={e.end_time}
                                    date={e.date}
                                    url={e.url}
                                    description={e.description}
                                />)
                        }
                    </div>
                </div>

                <MapSection center={center} zoomLevel={15} />
            </div>
        </>
    )
}