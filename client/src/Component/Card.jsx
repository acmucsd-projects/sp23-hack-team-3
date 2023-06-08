import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tag from "./Tag";
import { CardActionArea } from "@mui/material";
import axios from 'axios'
import { useState } from 'react'

export default function EventCard({ title, date, date2, location, flyer, description, tags, organization, del, _id, setMapCenter, setZoom, latitude, longitude }) {

  const [enlargeFlyer, setEnlargeFlyer] = useState(false)

  const handleDelete = () => {
    axios.delete(`http://localhost:4000/events/${_id}`, {withCredentials: true})
    .then( res => {
      console.log(res)
    })
    .catch(err => {
      console.log("Error on delete: ", err)
    })
  }

  const handleClick = () => {
    setMapCenter({
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    })
    setZoom(17)
  }
  
  return (
    <>
    <Card sx={{ width: "45vw", height: "27vh", marginTop: "3.5vh" }}>
      <CardActionArea onClick={handleClick}>
        <div
          style={{
            height: "27vh",
            width: "45vw",
            display: "flex",
            position: "relative",
          }}
        >
          <div style={{ height: "27vh", width: "15vw" }}>
            
              <CardMedia
              component="img"
              sx={{ height: "25vh", width: "13vw", padding: "0.5vw", cursor: 'pointer' }}
              image={flyer}
              alt=""
              onClick={() => setEnlargeFlyer(true)}
            />
            
          </div>
          <div style={{ height: "27vh", width: "30vw", overflowY: "scroll" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <div style={{ display: "flex", position: "relative", justifyContent: "space-between", alignItems: "center"}}>
              <Typography variant="body2" color="text.secondary">Organization: {organization}</Typography>
              </div>
              <div style={{ display: "flex", position: "relative", justifyContent: "space-between", alignItems: "center"}}>
              <Typography>{date} - {date2}</Typography>
              </div>
              <div style={{ display: "flex", position: "relative", justifyContent: "space-between", alignItems: "center"}}>
              <Typography>@ {location}</Typography>
              </div>
              
              <div >
                {/* <p>Test Tag</p> */}
                <div style={{ marginTop: "2vh", marginBottom: "2vh" }}>{
                  tags.map(tag => <Tag text={tag}/>)
                }</div>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </div>

              { del && <div style={{ marginTop: "2vh", marginBottom: "2vh" }}>
                <button onClick={handleDelete} style={{backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer', paddingRight: '10px', paddingLeft: '10px', paddingTop: '5px', paddingBottom: '5px', borderRadius: 5}}>Delete</button>
              </div>}
            </CardContent>
          </div>
        </div>
      </CardActionArea>
    </Card>

    {
      enlargeFlyer && 
      <div style={{ top: 0, left: 0, position: 'absolute', border: 'solid', backgroundColor: 'white' }}>
        <div>
          x
        </div>
        hellllllo
      </div>
    }
    </>
  );
}
