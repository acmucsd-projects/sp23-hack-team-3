import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Post.css";
import LogoBar from '../Component/LogoBar';
import API from '../API';
import axios from 'axios';
import location from '../locationTranslation.json'


function Post(){
    // // const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [date, setDate] = useState("");
    const [s_time, setStartTime] = useState("");
    const [e_time, setEndTime] = useState("");
    const [location, setLocation] = useState("Price Center");
    const [lng, setlng] = useState("32.8879708");
    const [lat, setlat] = useState("-117.2447013");
    const [tag, setTag] = React.useState({
        Free_Food: false,
        Free_Boba: false,
        On_Campus: false,
        Raffle: false,
        Giveaways: false
      });
    const [postTag, setPostTag] = useState([]);
    const [flyer, setFlyer] = useState("");
    const [value, setValue] = useState(dropDownValue)

    const handleToggle = ({ target }) =>
    setTag(s => ({ ...s, [target.name]: !s[target.name] }));

    const handlePostTag = () => {
        const selectedTags = Object.entries(tag)
        .filter(([key, value]) => value)
        .map(([key]) => key);

        setPostTag(selectedTags);
    }

    const parseTag = (key) => {
        return key.replace(/_/g, ' ');
    };

    const handleLocation = () => {
        setLocation("Price Center");
        setlng("32.8861");
        setlat("-117.2340");
    }

    const handleSetStartTime = (e) => {
        setStartTime('T' + e.target.value + ':00.000Z')
    }

    const handleSetEndTime = (e) => {
        setEndTime('T' + e.target.value + ':00.000Z');        
    }
    
    const dropDownValue = () => {
        const value = "Event Location"
        return value;
    } 

    const dropDownChange = (e) => {
        setValue(e.target.value)
        handleLocation()
    }

    
    
    const handlePost = async () => {

        handlePostTag();
        console.log("postTag: ", postTag);



        const payload = {
          name: title,
          organization: organizer,
          orgID: "6466d538b8554d8cf0783e58",
          date: new Date(date + s_time).toISOString(),
          date2: new Date(date + e_time).toISOString(),
          description: description,
          location: location,
          tags: postTag,
          flyer: "",
          lng: lng,
          lat: lat
        };
        
        console.log(payload)

        axios.post('http://localhost:4000/events', payload)
                .then(function (response){
                    console.log(response);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
            })

        navigate("/")
    };

    // const {
    //     register,
    //     getValues,
    //     handleSubmit,
    //     formState: { errors }
    //   } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);
      };


    return (
        <>
            <LogoBar />
            <form onSubmit={handlePost}>
                <h1 style = {{ marginTop: 30, textAlign: "center" }}>Create an Event</h1>
                
                <div className="form-info">
                    <div style = {{ width: '50%', fontWeight: 'bold', marginTop: 10, fontSize: '25px'}}>Basic Information</div>
                    <div style = {{ marginTop: 10 }}>These information will be the first impression for your potential event-goers, so be clear, descriptive, and unique!</div>
                </div>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="text" placeholder="Event Title" onChange={e => setTitle(e.target.value)} style= {{ width: '50%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                <div className="form-control" style = {{ marginTop: 20, textAlign: "center" }}>
                    <input type="text" placeholder="Organizer" onChange={e => setOrganizer(e.target.value)} style= {{ width: '50%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                {/*<div className="form-control" style = {{ marginTop: 20, textAlign: "center" }}>
                    <input type="text" placeholder="Event Location" onChange={handleLocation}  style = {{ width: '50%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                */}
                <div className="locationDropDown">
                    <select value = {value} onChange = {dropDownChange} style={{width: '50%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px'}} >
                        
                        <option value = "Price Center">Price Center</option>
                        <option value = "Geisel Library">Geisel Library</option>
                        <option value = "CSE Building">CSE Building</option>
                        <option value = "Center Hall">Center Hall</option>
                        <option value = "Warren College">Warren College</option>
                        <option value = "Sixth College">Sixth College</option>
                        <option value = "Revelle College">Revelle College</option>
                        <option value = "Muir College">Muir College</option>
                        <option value = "Eleanor Roosevelt College">Eleanor Roosevelt College</option>
                        <option value = "Marshall College">Marshall College</option>
                        <option value = "Seventh College">Seventh College</option>
                    </select>                   
                </div>

                <div class="flex-col" >
                    <div className="form-control">
                        <input 
                            type="date" 
                            name="date"
                            onChange={e => setDate(e.target.value)}
                            style = {{ marginTop: 20, fontSize: '18px', backgroundColor: '#D9D9D9', borderRadius: 8, border: 0, outline: 'solid 2', outlineColor: 'black', padding: 5 }} 
                        />
                    </div>
                    <div className="form-control">
                        <input 
                        type="time" 
                        name="start_time"
                        onChange={handleSetStartTime}
                        style = {{ marginTop: 20, fontSize: '18px', backgroundColor: '#D9D9D9', borderRadius: 8, border: 0, outline: 'solid 2', outlineColor: 'black', padding: 5}} 
                        required
                        />
                    </div>
                    <div className="form-control">
                        <input 
                        type="time" 
                        name="end_time"
                        onChange={handleSetEndTime}
                        style = {{ marginTop: 20, fontSize: '18px', backgroundColor: '#D9D9D9', borderRadius: 8, border: 0, outline: 'solid 2', outlineColor: 'black', padding: 5}} 
                        required
                        />
                    </div>
                </div>
                <div className="form-control" style = {{ marginTop: 20, textAlign: "center" }}>
                    <input 
                        type="text" 
                        placeholder="One sentence description of the event (max 150 characters)" 
                        name="description" 
                        onChange = { e => setDescription(e.target.value) } 
                        style = {{ width: '50%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 50, fontSize: '16px' }} 
                    />
                </div>
                
                <div className="form-info">
                    <div style = {{ marginTop: 30, width: '50%', fontWeight: 'bold', fontSize: '25px'}}>Tags</div>
                    <div style = {{ marginTop: 10 }}>Improve discoverability of your event by adding tags relevant to the subject matter.</div>
                </div>

                <div id="checkbox" style = {{ marginTop: 20 }}>
                    {Object.keys(tag).map(key => (
                        <div>
                            <input
                            type="checkbox"
                            onChange={handleToggle}
                            key={key}
                            name={key}
                            checked={tag[key]}
                            />

                            <label>{parseTag(key)}</label>
                        </div>
                    ))}
                </div>

                <div className="form-info">
                    <div style = {{ marginTop: 30, width: '50%', fontWeight: 'bold', fontSize: '25px'}}>Flyer</div>
                    <div style = {{ marginTop: 10 }}>A carefully crafted flyer could be the first step for a successful event.</div>
                </div>

                <div className="form-control" style = {{ marginTop: 20, textAlign: "center" }}>
                    <input 
                        type="file" 
                        name="file" 
                        onChange={e => setFlyer(e.target.value)}
                        style = {{ width: '50%', height: '30px', borderRadius: 8, paddingLeft: 10, paddingTop: 5, fontSize: '16px' }} 
                    />
                </div>


                <div className="form-control" style = {{ marginTop: 30, marginBottom: 50, width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <button type="submit" class="button">Create Event</button>
                </div>
            </form>
        </>
        )
}

export default Post;

