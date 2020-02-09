import axios from "axios";

const key = "AIzaSyAwc8WFD5xtDTal6InAw6NfxmGU3aomEJk";
const proxyurl = "https://cors-anywhere.herokuapp.com/";
export async function getBusinessLocations(
  searchTerm,
  latitude,
  longitude,
  radius
) {
  let businessStuff = null;
  await axios
    .get(
      `${proxyurl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&fields=price_level,types,user_ratings_total&type=restaurant&keyword=${searchTerm}&key=${key}`
    )
    .then(res => {
      const results = res.data.results;
      if (results !== undefined && results.length > 0) {
        // Get the first result and see if it matches the search
        let matchedResult = results[0];
        let restaurantName = matchedResult.name.toLowerCase();
        if (restaurantName.includes(searchTerm.toLowerCase())) {
          businessStuff = {
            id: matchedResult.place_id,
            name: matchedResult.name,
            overallRating: matchedResult.rating,
            totalRatings: matchedResult.user_ratings_total,
            price_level: "$".repeat(matchedResult.price_level) || null,
            types: matchedResult.types
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
  let allResults = {};
  await axios
    .get(
      `${proxyurl}https://maps.googleapis.com/maps/api/place/details/json?place_id=${business_id}&fields=name,url,rating,formatted_phone_number,price_level,review,user_ratings_total&key=${key}`
    )
    .then(res => {
      const results = res.data.result;
      if (results !== undefined) {
        allResults.reviews = results.reviews.map((review, i) => {
          let myDate = new Date(review.time * 1000);
          let month = myDate.getMonth() + 1;
          let day = myDate.getDay() + 1;
          let year = myDate.getFullYear();
          if (month < 10) month = `0${month}`;
          if (day < 10) day = `0${day}`;
          return {
            id: i + 1,
            timeCreated: `${month}-${day}-${year}`,
            rating: review.rating,
            text: review.text,
            userName: review.author_name,
            url: null
          };
        });
        allResults.url = results.url;
      }
    })
    .catch(err => {
      console.log(err);
    });
  return allResults;
}
export async function combineReviews(search, latitude, longitude, radius) {
  let google_search_dict = await getBusinessLocations(
    search,
    latitude,
    longitude,
    radius
  );
  let businessId = google_search_dict.id;
  let google_details_dict = await getBusinessReviews(businessId);

  let finalDict = {};

  finalDict.detailedInfo = {
    categories: google_search_dict.types,
    price: google_search_dict.price_level,
    overallRating: google_search_dict.overallRating,
    reviewCount: google_search_dict.totalRatings,
    url: google_details_dict.url
  };

  finalDict.reviews = [];
  var tempString = "";
  // Make up id's for the reviews
  for (let i = 0; i < google_details_dict.reviews.length; i++) {
    finalDict.reviews[i] = google_details_dict.reviews[i];
  }

  return finalDict;
}
