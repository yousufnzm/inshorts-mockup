import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/Link';
import Divider from '@material-ui/core/Divider';
import { Container } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function NewsCard({item}) {
  const classes = useStyles();

  return (
    <Container> 
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={item.urlToImage}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton aria-label="link" href={item.url}>
            <LinkIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Divider />
    </Container>
  );
}
