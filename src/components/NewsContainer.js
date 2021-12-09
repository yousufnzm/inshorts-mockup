import React from "react";
import Grid from '@material-ui/core/Grid';
import NewsCard from "./NewsCard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export default function NewsContainer({newsArray}){
  const classes = useStyles();

  return (
    <div>
      <Grid 
        container
        alignItems="center"
        justify="center"
        spacing={2}>
        {newsArray.map((newsItem) => (
              <Grid item>
                <NewsCard item={newsItem} key={newsItem.title} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
};
