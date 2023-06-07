import React, {useState} from "react"
import LogoBar from '../Component/LogoBar';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie'
import { useEffect } from "react";

export default function Login (){

    axios.defaults.withCredentials = true;
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [failed, setFailed] = useState(false)
    const navigate = useNavigate()

    // let loggedIn = false

    // const location = useLocation();
    // if( location.state && location.state.loggedIn){
    //     loggedIn = true
    // }

    // if( loggedIn ){
    //     navigate('/')
    // }

    useEffect( () => {
        if( Cookies.get('connect.sid') != undefined ){
            navigate('/')
        }
    }, [])
    

    const handleSubmit = async (event) => {

        event.preventDefault(); //prevent refreshing

        let loginObject = {
            "email": email,
            "password": password
        }
        // MAKE POST REQ(UEST THROUGH AXIOS 

        try {
            console.log("HELLO");

            setFailed(false)

            axios.post('http://localhost:4000/users/login', loginObject, {withCredentials: true})
                .then(function (response){
                    if( response.status === 200 ){
                       navigate('/', { state: {loggedIn: true }})
                    }

                })
                .catch(error => {
                    console.log("error: ", error);
                    if( error.response.status === 401 ){
                        setFailed(true)
                    }
                })
        }
        catch (err)
        {
            console.log(err);
        }
      }

    return(
        <>
            <LogoBar />
            <form style={{ display: "flex", flexDirection: "column"}} onSubmit={handleSubmit}>
                <h1 style = {{ marginTop: 50, textAlign: "center" }}>Sign In to Create an Event</h1>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="email" placeholder="Email" name="email" required  onChange={e => setEmail(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="password" placeholder="Password" name="password" required onChange={e => setPassword(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                { failed && <p style={{ color: 'red', textAlign: 'center' }}>Login failed. Please try again. </p>}
                <div className="form-control" style = {{ marginTop: 30, marginBottom: 50, width: '36%', height: '30px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <button type="submit" class="button" style={{ borderRadius: 5 }}>Sign In</button>
                </div>
                <div style = {{ textAlign: "center"}}>
                    Don't have an account? <a href="/signup" style = {{ textDecoration: "none"}}>Sign up now</a>
                </div>
            </form>
        </>
    )
}