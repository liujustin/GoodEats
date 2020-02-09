import axios from "axios";

const token =
  "MEyEDMdLjylo6GuVS1B7jAob_3nL0spA_T6sVhOp_o1TY7a-ivqBLdYUpTHn-JryEWlrLi_gBIDhZizjKK6F1xF5Jx9meYM1Rv96pacXkwO6b90e9idIuFpnsDQ_XnYx";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export async function getBusinessLocations(searchTerm, location) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      term: searchTerm,
      location: location
    }
  };
  // Use axios to get result
  let businessStuff = null;
  await axios
    .get(`${proxyurl}https://api.yelp.com/v3/businesses/search`, config)
    .then(res => {
      const businesses = res.data.businesses;
      if (businesses !== undefined || businesses.length > 0) {
        // Get the first business and see if it matches the search
        let matchedBusiness = businesses[0];
        let businessName = matchedBusiness.name.toLowerCase();
        if (businessName.includes(searchTerm.toLowerCase())) {
          businessStuff = {
            id: matchedBusiness.id,
            categories: matchedBusiness.categories,
            coordinates: matchedBusiness.coordinates,
            location: matchedBusiness.location,
            name: matchedBusiness.name,
            overallRating: matchedBusiness.rating,
            reviewCount: matchedBusiness.review_count,
            url: matchedBusiness.url
          };
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  return businessStuff;
}

export async function getBusinessReviews(business_id) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  // Use axios to get result
  let allReviews = null;
  await axios
    .get(
      `${proxyurl}https://api.yelp.com/v3/businesses/${business_id}/reviews`,
      config
    )
    .then(res => {
      const reviews = res.data.reviews;
      if (reviews !== undefined || reviews.length > 0) {
        allReviews = reviews;
      }
    })
    .catch(err => {
      console.log(err);
    });
  return allReviews;
}
