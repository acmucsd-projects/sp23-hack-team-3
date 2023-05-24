import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UserProfile.css";
import LogoBar from '../Component/LogoBar';
import EventCard from "../Component/Card"
import UserProfileCard from "../Component/UserProfileCard"
import eventData from "../event-data.json";
import userData from "../user-profile-data.json"

const eventCount = eventData.length;
const elements = eventData.map( e => 
    <EventCard 
    title={e.title}
    start={e.s_time}
    end={e.end_time}
    date={e.date}
    url={e.url}
    description={e.description}
     /> )

function ElementsLeft() {
    const leftElements = [];
for (let i = 0; i < eventCount/2; i++) {
    leftElements.push(elements[i]);
}
return leftElements;
}

function ElementsRight() {
    const rightElements = [];
    for (let i = eventCount/2; i < eventCount; i++) {
        rightElements.push(elements[i]);
    }
return rightElements;
}

function UserProfile() {
    return (
        <>
            {/**Logo Here */}
            <LogoBar />
            &emsp;
            <h1 style = {{marginLeft: 80}}>Your Profile</h1>
            <div className='UserProfile'>
                <div style = {{marginInline: 50}}>
                    {
                    userData.map( user => 
                        <UserProfileCard 
                        name={user.name}
                        description={user.description}
                        url={user.url}
                         /> )    
                    }
                </div>
            </div>
            {/** Implementation of Events */}
            <h1 style = {{marginLeft: 20, textAlign: 'center'}}>Your Events</h1>
            <div className='row'>
                <div className='LeftColumn'>
                    <div style={{ marginLeft: "4vw" }}>
                        {ElementsLeft()}
                    </div>
                </div>
                <div className='RightColumn'>
                    <div style={{ marginLeft: "4vw" }}>
                        {ElementsRight()}
                    </div>
                </div>
            </div>
            &emsp;
        </>
    )
}

export default UserProfile;