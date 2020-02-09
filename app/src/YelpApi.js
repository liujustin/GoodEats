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
      if (businesses !== undefined && businesses.length > 0) {
        // Get the first business and see if it matches the search
        let matchedBusiness = businesses[0];
        let businessName = matchedBusiness.name.toLowerCase();
        if (businessName.includes(searchTerm.toLowerCase())) {
          businessStuff = {
            overallInfo: {
              coordinates: matchedBusiness.coordinates,
              imageUrl: matchedBusiness.image_url,
              location: matchedBusiness.location,
              name: matchedBusiness.name
            },
            detailedInfo: {
              id: matchedBusiness.id,
              categories: matchedBusiness.categories,
              name: matchedBusiness.name,
              overallRating: matchedBusiness.rating,
              totalRatings: matchedBusiness.review_count,
              price: matchedBusiness.price,
              url: matchedBusiness.url
            }
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
      if (reviews !== undefined && reviews.length > 0) {
        allReviews = reviews.map(review => {
          let convertedDate = new Date(review.time_created);
          let month = convertedDate.getMonth() + 1;
          let day = convertedDate.getDate();
          let year = convertedDate.getFullYear();
          if (month < 10) month = `0${month}`;
          if (day < 10) day = `0${day}`;
          return {
            id: review.id,
            rating: review.rating,
            userName: review.user.name,
            text: review.text,
            timeCreated: `${month}-${day}-${year}`,
            url: review.url
          };
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
  return allReviews;
}

export async function getYelpBusinessData(searchTerm, location) {
  let businessLocationData = await getBusinessLocations(searchTerm, location);
  if (businessLocationData !== null) {
    let businessReviews = await getBusinessReviews(
      businessLocationData.detailedInfo.id
    );
    if (businessReviews !== null) {
      return {
        overallInfo: businessLocationData.overallInfo,
        detailedInfo: businessLocationData.detailedInfo,
        reviews: businessReviews
      };
    }
  } else {
    return null;
  }
}
