import axios from 'axios'
axios.defaults.withCredentials = true;
export default function Navbar({ loggedIn }){
    console.log("In navbar: ", loggedIn)
    
    const handleLogout = () => {
        axios.post('http://localhost:4000/users/logout', { withCredentials: true})
        .then(response => {
            console.log(response)
            console.log(response.status)
        })
        .catch(err => {
            console.log("Error logging out: ", err)
        })
    }
    
    return(
       <div style={{ display:'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0px 3px #D9D9D9', position: 'sticky', top: 0, zIndex: 1, backgroundColor: "white", height: '100px' }}>
            <div>
                <img src="../../eventify-logo.png" alt="Logo" style = {{ width: '28%', marginTop: 'auto', marginBottom: 'auto'}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {loggedIn && 
                <>
                <div><a href="/post"><button style = {{ cursor: 'pointer', fontWeight: 'bold', borderRadius: 20, border: 'none', padding: 10, paddingRight: 23, paddingLeft: 23, backgroundColor: '#5785E8', color: 'white', width: 150, marginRight: 10 }}>Create an Event</button></a></div>
                <div><a href="/profile"><button style = {{ cursor: 'pointer', fontWeight: 'bold', borderRadius: 20, border: 'none', padding: 10, paddingRight: 25, paddingLeft: 25, backgroundColor: '#5785E8', color: 'white', width: 150, marginRight: 10 }}>View Profile</button></a></div>
                <div><button onClick={handleLogout} style = {{ cursor: 'pointer', fontWeight: 'bold', borderRadius: 20, border: 'none', padding: 10, paddingRight: 25, paddingLeft: 25, backgroundColor: '#5785E8', color: 'white', width: 150 }}>Logout</button></div>
                </>
                }
                {loggedIn == false &&
                <>
                <div><a href="/login"><button style = {{ cursor: 'pointer', fontWeight: 'bold', borderRadius: 20, border: 'none', padding: 10, paddingRight: 25, paddingLeft: 25, backgroundColor: '#5785E8', color: 'white', width: 150, marginRight: 10 }}>Login</button></a></div>
                <div><a href="/signup"><button style = {{ cursor: 'pointer', fontWeight: 'bold', borderRadius: 20, border: 'none', padding: 10, paddingRight: 25, paddingLeft: 25, backgroundColor: '#5785E8', color: 'white', width: 150 }}>Signup</button></a></div>
                </>

                }
            </div>
        </div> 
        
    )
}
