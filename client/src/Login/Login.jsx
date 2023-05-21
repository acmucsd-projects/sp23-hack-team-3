import React, {useState} from "react"
import { useForm } from "react-hook-form";
import LogoBar from '../Component/LogoBar';

export default function Login (){

    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    return(
        <>
            <LogoBar />
            <form style={{ display: "flex", flexDirection: "column"}}>
                <h1 style = {{ marginTop: 50, textAlign: "center" }}>Sign In to Create an Event</h1>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="text" placeholder="Username" name="username" {...register("username")} onChange={e => setUsername(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
                </div>
                <div className="form-control" style = {{ marginTop: 30, textAlign: "center" }}>
                    <input type="password" placeholder="Password" name="password" {...register("password")} onChange={e => setPassword(e.target.value)} style= {{ width: '35%', height: '30px', backgroundColor: '#D9D9D9', borderRadius: 5, paddingLeft: 10, border: 0, outline: 'solid 2', outlineColor: 'black', paddingTop: 5, paddingBottom: 5, fontSize: '16px' }} />
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