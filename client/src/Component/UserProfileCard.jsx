import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function UserProfileCard({name, description, url}) {
  return (
    <Card sx={{ maxWidth: "45vw", marginTop: "3.5vh"}}>
      <CardActionArea>
        <div style={{ display: "flex", position: "relative", alignItems: "center" }}>
          <div style={{ height: "20vh", width: "13vw" }}>
            <CardMedia
              component="img"
              sx={{ height: "18vh", width: "10vw", padding: "1vw"}}
              image={url}
              alt=""
            />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
