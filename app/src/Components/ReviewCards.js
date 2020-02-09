import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Typography,
} from '@material-ui/core';


const ReviewCards = (props) => {

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      // maxWidth: '33.3333%',
     
    },
    card: {
      margin: '0 30px',
      padding: '30px',
    },
  
  });

  const classes = useStyles();

  const cards = [1, 2, 3, 4, 5, 6];
  const reviewCards = cards.map( (card) => 
    <Grid item xs={12} key={card}>
      <Card className={classes.card}>
        <Typography variant="h6">Name</Typography>
        <Typography variant="subtitle2">Rating</Typography>
        <Typography variant="body1">Comment</Typography>
        <a href='#' alt="review link" target="_blank"></a>
      </Card>
    </Grid>
  )
  
  return ( 
    <>
    <div className={classes.root}>
      <Grid container spacing={3}>
        {reviewCards}
      </Grid>
    </div>
    </>
   );
}
 
export default ReviewCards;