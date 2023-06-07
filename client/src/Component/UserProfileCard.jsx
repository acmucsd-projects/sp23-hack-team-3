import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function UserProfileCard({name}) {
  return (
    <Card sx={{ maxWidth: "45vw", marginTop: "3.5vh"}}>
      <CardActionArea>
        <div style={{ display: "flex", position: "relative", alignItems: "center" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
}
