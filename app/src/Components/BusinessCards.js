import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Card,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import google from '../assets/google.png';
import yelp from '../assets/yelp.png';
import foursquare from '../assets/foursquare.png';

const BusinessCards = (props) => {

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    card: {
      margin: '0 30px',
      padding: '30px',
      textAlign: 'center'
    },
    logos: {
      height: 50,
      width: 120,
      margin: 'auto'
    },
  });

  const classes = useStyles();

  const cards = [google, yelp, foursquare];
  const businessCards = cards.map( (card) => 
    <Grid item xs key={card}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.logos}
          image={card}
          title="Google logo"
        />
        <div style={{margin: '25px 0'}}>
          <Typography variant="h6">Ratings</Typography>
          <Typography variant="h6"># of Reviews</Typography>
        </div>
        <a href='#' alt="review link" target="_blank"></a>
      </Card>
    </Grid>
  )
  
  return ( 
    <>
    <div className={classes.root}>
      <Grid container spacing={3}>
        {businessCards}
      </Grid>
    </div>
    </>
   );
}
 
export default BusinessCards;