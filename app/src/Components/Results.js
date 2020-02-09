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

const Results = (props) => {

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#F83D3D',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));

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
          Business Name
        </Typography>
        <Typography
          variant="h5"
          style={{margin: '0 100px'}}
        >
          Address
        </Typography>
        <Typography
          variant="body1"
          style={{margin: '0 100px'}}
        >
          Phone Number
        </Typography>
      </Container>

      <div style={{margin: '100px'}}>
        <BusinessCards />
      </div>

      <Typography
          variant="h4"
          style={{margin: '0 130px'}}
        >
          Reviews
      </Typography>

      <div style={{margin: '50px 100px'}}>
        <ReviewCards />
      </div>

    </>
   );
}
 
export default Results;