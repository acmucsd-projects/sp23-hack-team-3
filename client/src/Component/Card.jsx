import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function EventCard({test}) {
  return (
    <Card sx={{ maxWidth: "45vw", marginTop: "3.5vh"}}>
      <CardActionArea>
        <div style={{ display: "flex", position: "relative", alignItems: "center" }}>
          <CardMedia
            component="img"
            sx={{ height: 150, padding: 2 }}
            image="logo512.png"
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {test}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
