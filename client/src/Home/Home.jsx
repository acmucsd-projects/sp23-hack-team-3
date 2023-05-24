import LogoBar from '../Component/LogoBar';
import EventCard from "../Component/Card"
import "./Home.css";
import eventData from "../event-data.json";

export default function Home() {
    return (
        <>
            <LogoBar />
            <div className='EventList'>
                <p>{eventData.length} events</p>
                <h1>Upcoming Events</h1>
                <div style={{ marginLeft: "4vw" }}>
                    {
                        eventData.map( e => 
                        <EventCard 
                        title={e.title}
                        start={e.s_time}
                        end={e.end_time}
                        date={e.date}
                        url={e.url}
                        description={e.description}
                         /> )
                    }
                </div>
            </div>
        </>
    )
}