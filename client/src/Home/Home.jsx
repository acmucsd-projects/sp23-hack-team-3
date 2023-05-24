import LogoBar from '../Component/LogoBar';
import EventCard from "../Component/Card"
import "./Home.css"

export default function Home() {
    return (
        <>
            <LogoBar />
            <div className='EventList'>
                <p>5 events</p>
                <h1>Upcoming Events</h1>
                <div style={{ marginLeft: "4vw" }}>
                    <EventCard test={"a"} />
                    <EventCard test={"b"} />
                    <EventCard test={"c"} />
                    <EventCard test={"d"} />
                </div>
            </div>
        </>
    )
}