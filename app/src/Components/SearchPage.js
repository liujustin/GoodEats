import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Container,
  Grid,
  Typography,
  Button
} from '@material-ui/core';


function SearchPage(props) {

  const [input, setInput] = useState('');

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#F83D3D',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    searchSection: {
      backgroundColor: '#FF5757',
      height: '350px',
      margin: 'auto',
      textAlign: 'center'
    },
    searchBar: {
      width: '100%',
    },
    searchBtn: {
      backgroundColor: '#E3B505',
      marginTop: '85px',
      padding: '30px 70px'
    },
    searchField: {
      width: '45%', 
      margin: '0 20px',
      color: 'white'
    }
  }));

  const classes = useStyles();

  const handleSearchInput = (e) => {
    setInput(e.target.value);
  }

  return ( 
    <>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.root}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.searchSection}>
        <Container>
          <Typography variant="h1" style={{padding: '30px 0'}}>Title</Typography>
          <Grid item xs={3} />
          <Grid item xs className={classes.searchBar}>
            <TextField 
              id="outlined-basic" 
              label="What I want" 
              variant="outlined"
              className={classes.searchField}
              color="white"
              value={input}
              onChange={handleSearchInput} 
            />
            <TextField 
              id="outlined-basic" 
              label="Where I want it" 
              variant="outlined"
              className={classes.searchField}
              color="white"
              value={input}
              onChange={handleSearchInput} 
            />
          </Grid>
          <Grid item xs={3} /> 
        </Container>
        <Button
          variant="contained"
          id="searchBtn"
          size="large"
          className={classes.searchBtn}
        >
          Search
        </Button>  
      </div>
    </>
   );
} 
 
export default SearchPage;