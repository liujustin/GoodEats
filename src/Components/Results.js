import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Card,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core'
import BusinessCards from './BusinessCards';
import ReviewCards from './ReviewCards';
import { withRouter } from 'react-router-dom'

const Results = (props) => {
  const {businessInfo, yelp, foursquare, google} = props.location.state.res 
  const businessName = businessInfo.name
  const businessLocation = businessInfo.location
  const businessAddress = `${businessLocation.address1} ${businessLocation.address2} ${businessLocation.city} ${businessLocation.state} ${businessLocation.zip_code}`
  const businessPhone = businessInfo.phoneNumber

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#F83D3D',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  const yelpReviews = yelp.reviews || []
  const foursquareReviews = foursquare.reviews
  const googleReviews = google.reviews || []
  const allReviews = [...yelpReviews, ...foursquareReviews, ...googleReviews]
  console.log(allReviews)

  const classes = useStyles();
  return ( 
    <>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.root}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container>
        <Typography
          variant="h3"
          style={{margin: '50px 100px'}}
        >
          {businessName}
        </Typography>
        <Typography
          variant="h5"
          style={{margin: '0 100px'}}
        >
          {businessAddress}
        </Typography>
        <Typography
          variant="body1"
          style={{margin: '0 100px'}}
        >
          Phone Number: {businessPhone}
        </Typography>
      </Container>

      <div style={{margin: '100px'}}>
        <BusinessCards yelp={yelp} foursquare={foursquare} google={google}/>
      </div>

      <Typography
          variant="h4"
          style={{margin: '0 130px'}}
        >
          Reviews
      </Typography>

      <div style={{margin: '50px 100px'}}>
        <ReviewCards reviews={allReviews}/>
      </div>

    </>
   );
}
 
export default withRouter(Results);