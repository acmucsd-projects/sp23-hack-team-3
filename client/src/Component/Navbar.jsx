export default function Navbar({ loggedIn }){
    return(
        <div style={{ display:'flex', justifyContent: 'space-around', alignItems: 'center', boxShadow: '0px 3px #D9D9D9 fit-content', position: 'sticky', top: 0, zIndex: 1, backgroundColor: "white" }}>
            <div>
                <img src="../../eventify-logo.png" alt="Logo" style = {{ width: '28%', marginTop: 'auto', marginBottom: 'auto'}} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div><a href="/login"><button style = {{ cursor: 'pointer', borderRadius: 20, border: 'none', padding: 10, paddingRight: 25, paddingLeft: 25, backgroundColor: '#5785E8', color: 'white', width: 150, marginRight: 10 }}>Create an Event</button></a></div>
                {loggedIn && <div><a href="/login"><button style = {{ cursor: 'pointer', borderRadius: 20, border: 'none', padding: 10, paddingRight: 25, paddingLeft: 25, backgroundColor: '#5785E8', color: 'white', width: 150 }}>View Profile</button></a></div>}
            </div>
        </div> 
    )
}