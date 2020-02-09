import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Typography,
} from '@material-ui/core';


const ReviewCards = (props) => {
  console.log(props)

  const {reviews} = props

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

  // const cards = [1, 2, 3, 4, 5, 6];
  const reviewCards = reviews.map(review => (
    <Grid item xs={12} key={review.id}>
      <a href={review.url} style={{ textDecoration: "none" }} target="_blank">
        <Card className={classes.card}>
          <Typography variant="h6">
            {review.userName || "Unknown User"}
          </Typography>
          <Typography variant="subtitle2">
            Rating: {review.rating || ""}*
          </Typography>
          <Typography variant="subtitle2">
            Written at: {review.timeCreated}
          </Typography>
          <Typography variant="body1">{review.text}</Typography>
        </Card>
      </a>
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
