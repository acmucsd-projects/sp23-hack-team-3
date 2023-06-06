import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function EventCard({ title, date, flyer, description }) {
  return (
    <Card sx={{ width: "45vw", height: "25vh", marginTop: "3.5vh" }}>
      <CardActionArea>
        <div style={{ height: "25vh", width: "45vw", display: "flex", position: "relative" }}>
          <div style={{ height: "25vh", width: "15vw" }}>
            <CardMedia
              component="img"
              sx={{ height: "23vh", width: "13vw", padding: "1vw"}}
              image={flyer}
              alt=""
            />
          </div>
          <div style={{ height: "25vh", width: "30vw", overflowY: "scroll" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography>
                {date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
}
