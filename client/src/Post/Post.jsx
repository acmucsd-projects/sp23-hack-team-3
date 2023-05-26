import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Post.css";
import { useForm } from "react-hook-form";
import LogoBar from '../Component/LogoBar';


function Post(){
    // // const user = localStorage.getItem('user');
    // // const navigate = useNavigate();
    // const [searchQuery, setSearchQuery] = useState("");
    // const [name, setName] = useState("");
    
    // // const [location, setLocation] = useState([0, 0]);
    // // const [value, setValue] = useState(0);
    // const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = React.useState({
        Free_Food: false,
        Free_Boba: false,
        On_Campus: false,
        Raffle: false,
        Giveaways: false
      });

    const handleToggle = ({ target }) =>
    setTag(s => ({ ...s, [target.name]: !s[target.name] }));

    const parseTag = (key) => {
        return key.replace(/_/g, ' ');
    };

    
    
    // const handleFileUpload = async (e) => {
    //   const file = e.target.files[0];
    //   const form = new FormData();
    //   form.append('image', file)
    //   setImage(form);
    // };

    
    // const handlePost = async () => {
    //     const payload = {
    //       username: user,
    //       restaurant: restaurant,
    //       image: "",
    //       postTitle: title,
    //       review: review,
    //       stars: value
    //     };
    //     console.log(payload)
    //     const new_post = await API.createPost(payload);
    //     const file_upload = await API.uploadPostImage(image, new_post.data._id);
    //     navigate("/home")
    // };
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
    
      const onSubmit = (data) => {
        console.log(data);
      };


    return (
        <>
            <LogoBar />
            <form>
                <h1 style = {{ marginTop: 30, textAlign: "center" }}>Create an Event</h1>
                
                <div className="form-info">
                    <div style = {{ width: '50%', fontWeight: 'bold', marginTop: 10, fontSize: '25px'}}>Basic Information</div>
                    <div style = {{ marginTop: 10 }}>These information will be the first impression for your potential event-goers, so be clear, descriptive, and unique!</div>
                </div>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="text" placeholder="Event Title" name="title" {...register("title", {required: true})} onChange={e => setTitle(e.target.value)} style= {{ width: '50%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                <div className="form-control" style = {{ marginTop: 20, textAlign: "center" }}>
                    <input type="text" placeholder="Organizer" name="organizer" {...register("organizer", {required: true})} style= {{ width: '50%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                <div className="form-control" style = {{ marginTop: 20, textAlign: "center" }}>
                    <input type="text" placeholder="Event Location" name="location" {...register("location", {required: true})}  style = {{ width: '50%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 8, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>

                <div class="flex-col" >
                    <div className="form-control">
                        <input 
                            type="date" 
                            placeholder="Date" 
                            name="date" {...register("date", {required: true})}  
                            style = {{ marginTop: 20, fontSize: '18px', backgroundColor: '#D9D9D9', borderRadius: 8, border: 0, outline: 'solid 2', outlineColor: 'black', padding: 5 }} 
                        />
                    </div>
                    <div className="form-control">
                        <input 
                            type="time" 
                            placeholder="Start Time" 
                            name="start_time" {...register("start_time", {required: true})}  
                            style = {{ marginTop: 20, fontSize: '18px', backgroundColor: '#D9D9D9', borderRadius: 8, border: 0, outline: 'solid 2', outlineColor: 'black', padding: 5}} 
                        />
                    </div>
                    <div className="form-control">
                        <input 
                            type="time" 
                            placeholder="End Time" 
                            name="end_time" {...register("end_time", {required: true})}  
                            style = {{ marginTop: 20, fontSize: '18px', backgroundColor: '#D9D9D9', borderRadius: 8, border: 0, outline: 'solid 2', outlineColor: 'black', padding: 5 }} 
                        />
                    </div>
                </div>
                <div className="form-control" style = {{ marginTop: 20, textAlign: "center" }}>
                    <input 
                        type="text" 
                        placeholder="One sentence description of the event (max 150 characters)" 
                        name="description" {...register("description", {
                            maxLength: 150,
                            required: true
                        })} 
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
                        name="file" {...register("file", {required: true})} 
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

