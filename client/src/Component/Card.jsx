import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function EventCard({title, date, start, end, url, description}) {
  return (
    <Card sx={{ maxWidth: "45vw", marginTop: "3.5vh"}}>
      <CardActionArea>
        <div style={{ display: "flex", position: "relative", alignItems: "center" }}>
          <CardMedia
            component="img"
            sx={{ height: 150, padding: 2 }}
            image={url}
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography>
              {start}-{end} on {date}
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
