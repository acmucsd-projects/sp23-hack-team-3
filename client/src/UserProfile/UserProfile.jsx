import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import "./UserProfile.css";
//import LogoBar from '../Component/LogoBar';
import Navbar from '../Component/Navbar';
import EventCard from "../Component/Card"
import UserProfileCard from "../Component/UserProfileCard"
import API from '../API.js';
import {useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
//import eventData from "../event-data.json";
//import userData from "../user-profile-data.json"


function ElementsLeft(eventData) {
    const leftElements = [];
    for (let i = 0; i < eventData.length; i++) {
        if(i % 2 === 0) {
            leftElements.push(eventData[i]);
        }
    }
    return leftElements;
}

function ElementsRight(eventData) {
    const rightElements = [];
    for (let i = 0; i < eventData.length; i++) {
        if(i % 2 === 1) {
            rightElements.push(eventData[i]);
        }
    }
return rightElements;
}

function UserProfile() {
    const [eventData, setProfileEventData] = useState([])
    const [userData, setUsername] = useState([])
    /*const eventCount = eventData.length;
    const elements = eventData.map( e => 
        <EventCard 
        title={e.title}
        start={e.s_time}
        end={e.end_time}
        date={e.date}
        url={e.url}
        description={e.description}
     /> )

    useEffect(() => {
        API.getProfileEvents().then((response) => {
            setProfileEventData(response.data);
        });
    }, []);
    useEffect(() => {
        API.getOrganization().then((response) => {
            setUsername(response.data);
        });
    }, []);
    */
    const getUserEvents = async () => {
        axios.get('http://localhost:4000/events/profile') 
            .then(function(response) {
                console.log(response);
                const userEvents = response.data;
                setProfileEventData(userEvents);
            })
            .catch(function(error) {
                console.log("ERROR!!!!" + error);
            }
        )
    };

    useEffect(() => {
        getUserEvents();
    }, []);
    

    function stringToDate(inputDate) {
        let date = new Date(inputDate);
        let dateString = date.toLocaleString("en-US", {
            timeZone: "America/Los_Angeles"
        })
        return dateString;
    }
    const navigate = useNavigate();
    const location = useLocation();
    let loggedIn = false; 

    if (location.state && location.state.loggedIn) {
        loggedIn = true;
    }

    if (loggedIn === false) {
        navigate('/login');
    }

    const elements = eventData.map((e, index) => 
        <EventCard 
        key={index}
        title={e.title}
        date={stringToDate(e.date)}
        flyer={e.flyer}
        description={e.description}
        tags={e.tags}
     /> )
    return (
        <>
            {/**Logo Here */}
            <Navbar loggedIn={loggedIn} />
            <h1 style = {{marginLeft: 80}}>Your Profile</h1>
            <div className='UserProfile'>
                <div style = {{marginInline: 50}}>
                    {
                    userData.map( user => 
                        <UserProfileCard 
                        name={user.name}
                         /> )    
                    }
                </div>
            </div>
            {/** Implementation of Events */}
            <h1 style = {{textAlign: 'center'}}>Your Events</h1>
            <div className='row'>
                <div className='LeftColumn'>
                    <div style={{ marginLeft: "4vw" }}>
                        {ElementsLeft(elements)}
                    </div>
                </div>
                <div className='RightColumn'>
                    <div style={{ marginLeft: "4vw" }}>
                        {ElementsRight(elements)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;