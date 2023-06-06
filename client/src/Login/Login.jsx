import React, {useState} from "react"
import { useForm } from "react-hook-form";
import LogoBar from '../Component/LogoBar';
import API from '../API.js';
import axios from 'axios';
export default function Login (){

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    const onSubmit = () => {
        let loginObject = {
            "email": email,
            "password": password
        }
        // MAKE POST REQ(UEST THROUGH AXIOS 

        try {
            console.log("HELLO");
            console.log(loginObject);

            //old
            // axios.post("http://localhost:4000/users/login", loginObject)

            axios.post('http://localhost:4000/users/login', loginObject, {withCredentials: true})
                .then(function (response){
                    console.log(response);
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
            console.log("HELLO2");
        }
        catch (err)
        {
            console.log("FAILED");
            console.log(err);
        }

        

        // const users = await API.getUsers();
        // let userFound = false;
        // for (let user of users.data){
        //     if (user.email === email){
        //     userFound = true;
        //     if (bcrypt.compare(password, user.password)){
        //         localStorage.setItem('user', user._id)
        //         navigate("/home");
        //     }
        //     else{
        //         alert("Wrong Password Entered");
        //     }
        //     }
        // }
        // if (!userFound) {
        //     alert("User with email " + email + " not found.");
        // }
        //const result = await axios.post('https://testapi.org/post', { name: 'John Doe' });
      }

    return(
        <>
            <LogoBar />
            <form style={{ display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onSubmit)}>
                <h1 style = {{ marginTop: 50, textAlign: "center" }}>Sign In to Create an Event</h1>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="email" placeholder="Email" name="email" required {...register("email")} onChange={e => setEmail(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="password" placeholder="Password" name="password" required {...register("password")} onChange={e => setPassword(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
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