import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Post.css";
import LogoBar from '../Component/LogoBar';
import axios from 'axios';
import lt from '../locationTranslation.json'



function Post(){

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [date, setDate] = useState("");
    const [s_time, setStartTime] = useState("");
    const [e_time, setEndTime] = useState("");
    const [location, setLocation] = useState("PC");
    const [lng, setlng] = useState("32.8879708");
    const [lat, setlat] = useState("-117.2447013");
    const [tag, setTag] = React.useState({
        Free_Food: false,
        Free_Boba: false,
        On_Campus: false,
        Raffle: false,
        Giveaways: false
      });
    const [postTag, setPostTag] = useState('');
    const [flyer, setFlyer] = useState([]);
    const [val, setValue] = useState("");
    const [failed, setFailed] = useState(false);

    useEffect( () => {
        axios.get('http://localhost:4000/logged', {withCredentials: true})
        .then( response => {
            // console.log("post: ", response.data.logged)
            if( response.data.logged !== true ){
                navigate('/')
            }
        })
        .catch( err => {
            console.log("logged: ", err)
        })
    }, [])

    const handleToggle = ({ target }) =>
    setTag(s => ({ ...s, [target.name]: !s[target.name] }));

    useEffect( () => {
        let selectedTags = Object.entries(tag) 
        .filter(([key, value]) => value);

        selectedTags = selectedTags.map(t => t[0])

        selectedTags = JSON.stringify(selectedTags)

        console.log("selectedTags: ", selectedTags) 

        setPostTag(selectedTags); 
    }, [tag])
    
    const parseTag = (text) => {
        return text.replace(/_/g, ' ');
    };

    useEffect( () => {
        const lt_list = Object.keys(lt);
        const v_list = Object.values(lt);
        
        setLocation(lt_list[val]);
        setlng(v_list[0].lng);
        setlat(v_list[0].lat);
    }, [val])
    
    const handleSetStartTime = (e) => {
        setStartTime('T' + e.target.value + ':00.000Z')
    }

    const handleSetEndTime = (e) => {
        setEndTime('T' + e.target.value + ':00.000Z');        
    }
    
    // const dropDownValue = () => {
    //     const value = "Event Location"
    //     return value;
    // } 


    const dropDownChange = (e) => {
        setValue(e.target.value)
    }
    console.log("val: ", val)
    console.log(lt[val])


    const handleFlyerUpload = async (event) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setFlyer(file)
        } else {
            console.log("Please select an image file")
        }

    }
    
    const handlePost = async (event) => {

        event.preventDefault();

        setFailed(false)

        let formData = new FormData();
        formData.append("name", title);
        formData.append("organization", organizer);
        // formData.append("orgID", "6466d538b8554d8cf0783e58");
        formData.append("date", new Date(date + s_time).toISOString());
        formData.append("date2", new Date(date + e_time).toISOString());
        formData.append("description", description);
        formData.append("location", location);
        formData.append("tags", postTag);
        formData.append("flyer", flyer);
        formData.append("lng", lng);
        formData.append("lat", lat);

        const config = {    
            headers: { 'content-type': 'multipart/form-data' }
        }

        for (var key of formData.entries()) {
            console.log(key[0] + ", " + key[1]);
        }

        axios.post('http://localhost:4000/events/', formData, {withCredentials: true}, config)
                .then(function (response){
                    console.log(response);
                    console.log(response.data);
                    if( response.status === 201 ){
                        navigate("/")
                    }
                })
                .catch(error => {
                    console.log(error);
                    if( error.reponse.status === 409 ){
                        setFailed(true)
                    }
                    
            })
       
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
                
                <div className="locationDropDown" style = {{ marginTop: 20, textAlign: "center" }}>
                    <select value = {val} onChange = {dropDownChange} style={{ width: '51%', height: '40px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px'}} >
                        
                        {Object.keys(lt).map((lo, inx) => (
                        <option value={inx}>{lo}</option>))}
                        
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
                        onChange={handleFlyerUpload}
                        style = {{ width: '50%', height: '30px', borderRadius: 8, paddingLeft: 10, paddingTop: 5, fontSize: '16px' }} 
                    />
                </div>

                { failed && <p style={{ color: 'red', textAlign: 'center' }}>Posting failed. Please try again.</p>}

                {/* <button onClick={handlePostTag}>testing</button> */}
                <div className="form-control" style = {{ marginTop: 30, marginBottom: 50, width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <button type="submit" class="button">Create Event</button>
                </div>
            </form>
        </>
        )
}

export default Post;

