import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import googleImg from "../assets/google.png";
import yelpImg from "../assets/yelp.png";
import foursquareImg from "../assets/foursquare.png";

const BusinessCards = props => {
  const { yelp, foursquare, google } = props;
  console.log(props);

  const useStyles = makeStyles({
    root: {
      flexGrow: 1
    },
    card: {
      margin: "0 30px",
      padding: "30px",
      textAlign: "center"
    },
    logos: {
      height: 50,
      width: 120,
      margin: "auto"
    }
  });

  const classes = useStyles();

  const cards = [
    {
      image: googleImg,
      data: google
    },
    {
      image: yelpImg,
      data: yelp
    },
    {
      image: foursquareImg,
      data: foursquare
    }
  ];
  const businessCards = cards.map(card => {
    return (
      <Grid item xs key={card.data.detailedInfo.id}>
        <a
          href={card.data.detailedInfo.url}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <Card className={classes.card}>
            <CardMedia
              className={classes.logos}
              image={card.image}
              title="Google logo"
            />
            <div style={{ margin: "25px 0" }}>
              <Typography variant="h6">
                Overall Rating: {card.data.detailedInfo.overallRating || ""}*
              </Typography>
              <Typography variant="h6">
                Total Number of ratings:{" "}
                {card.data.detailedInfo.reviewCount || ""}
              </Typography>
            </div>
          </Card>
        </a>
      </Grid>
    );
  });

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {businessCards}
        </Grid>
      </div>
    </>
  );
};

export default BusinessCards;
