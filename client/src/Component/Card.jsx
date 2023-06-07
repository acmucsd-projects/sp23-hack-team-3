import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tag from "./Tag";
import { CardActionArea } from "@mui/material";

export default function EventCard({ title, date, date2, flyer, description, tags, organization }) {

  return (
    <Card sx={{ width: "45vw", height: "25vh", marginTop: "3.5vh" }}>
        <div
          style={{
            height: "25vh",
            width: "45vw",
            display: "flex",
            position: "relative",
          }}
        >
          <div style={{ height: "25vh", width: "15vw" }}>
            <CardMedia
              component="img"
              sx={{ height: "23vh", width: "13vw", padding: "0.5vw" }}
              image={flyer}
              alt=""
            />
          </div>
          <div style={{ height: "25vh", width: "30vw", overflowY: "scroll" }}>
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
              
              <div >
                {/* <p>Test Tag</p> */}
                <div style={{ marginTop: "2vh", marginBottom: "2vh" }}>{
                  tags.map(tag => <Tag text={tag}/>)
                }</div>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </div>
            </CardContent>
          </div>
        </div>
    </Card>
  );
}
