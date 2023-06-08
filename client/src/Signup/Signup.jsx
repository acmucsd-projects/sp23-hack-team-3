import React, {useEffect, useState} from "react"
import axios from 'axios';
import LogoBar from '../Component/LogoBar';
import { useNavigate } from "react-router-dom";

export default function Signup (){
    
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [organization, setOrg] = useState("")
    const [duplicate, setDuplicate] = useState(false)

    const navigate = useNavigate();

    const handleRegister = async (event) =>{

        setDuplicate(false);

        event.preventDefault();

        const payload = {
            //organization: organization,
            email: email,
            password: password
        }

        console.log(payload);

        axios.post('http://localhost:4000/users/login', payload, {withCredentials: true})
            .then(function (response){
                console.log("ok: ", response.status === 201 );

                if(response.status === 201){
                    navigate('/', { state: {loggedIn: true} });
                } 
            })
            .catch(error => {
                console.log("error: ", error);
                if( error.response.status === 409 ){
                    setDuplicate(true);
                }

            })
    };

    useEffect( () => {
        axios.get('http://localhost:4000/logged', {withCredentials: true})
        .then( response => {
            console.log(response.data.logged)
            if( response.data.logged === true ){
                navigate('/login')
            }
        })
        .catch( err => {
            console.log("logged: ", err)
        })
    }, [])
    

    return(
        <>
            <LogoBar />
            <form style={{ display: "flex", flexDirection: "column"}} onSubmit={handleRegister}>
                <h1 style = {{ marginTop: 50, textAlign: "center" }}>Create Your Account</h1>
                
                {/* <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="text" placeholder="Organization" name="organization" required onChange={e => setOrg(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div> */}
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="email" placeholder="Email" name="email" required onChange={e => setEmail(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="password" placeholder="Password" name="password" required onChange={e => setPassword(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                { duplicate && <p style={{ color: 'red', textAlign: 'center' }}>Account with the email already exist. </p>}
                <div className="form-control" style = {{ marginTop: 30, marginBottom: 50, width: '36%', height: '30px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <button type="submit" class="button" style={{ borderRadius: 5 }}>Create your account</button>
                </div>
                <div style = {{ textAlign: "center"}}>
                    Already have an account? <a href="/login" style = {{ textDecoration: "none"}}>Login</a>
                </div>
                
            </form>
        </>
    )
}