import axios from "axios";

const key = 'AIzaSyAwc8WFD5xtDTal6InAw6NfxmGU3aomEJk'
const proxyurl = "https://cors-anywhere.herokuapp.com/";
export async function getBusinessLocations(searchTerm, latitude, longitude, radius) {
    let businessStuff = null;
    await axios
        .get(`${proxyurl}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&fields=price_level,types,user_ratings_total&type=restaurant&keyword=${searchTerm}&key=${key}`)
        .then(res => {
            const results = res.data.results;
            console.log(results);
            if (results !== undefined || results.length > 0 ) {
                // Get the first result and see if it matches the search
                let matchedResult = results[0];
                let restaurantName = matchedResult.name.toLowerCase();
                console.log(
                    restaurantName.includes(searchTerm.toLowerCase()),
                    restaurantName,
                    searchTerm.toLowerCase()
                );

                console.log('Matched result: ' ,matchedResult)
                if (restaurantName.includes(searchTerm.toLowerCase())) {
                    businessStuff = {
                        id: matchedResult.place_id,
                        name: matchedResult.name,
                        overallRating: matchedResult.rating,
                        totalRatings: matchedResult.user_ratings_total,
                        price_level : "$".repeat(matchedResult.price_level) || null,
                        types       : matchedResult.types
                    };
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
        return businessStuff
}
export async function getBusinessReviews(business_id) {
  let allResults = null;
  await axios
    .get(
      `${proxyurl}https://maps.googleapis.com/maps/api/place/details/json?place_id=${business_id}&fields=name,url,rating,formatted_phone_number,price_level,review,user_ratings_total&key=${key}` 
    )
    .then(res => {
      const results = res.data.result
      //const reviews = res.data.result.reviews
      console.log(res.data)
      if (results !== undefined) {
        allResults= results;
        var myDate = null;
        let month = 0;
        let day = 0;
        let year = 0;
        for (let i = 0 ; i < allResults.reviews.length; i++)
        {
          allResults.reviews[i].id = i + 1;
          myDate = new Date(allResults.reviews[i].time * 1000);
          month = myDate.getMonth() + 1;
          day = myDate.getDay() + 1;
          year = myDate.getFullYear();
          if (month < 10) month = `0${month}`;
          if (day < 10) day = `0${day}`
          allResults.reviews[i].time = `${month}-${day}-${year}`
        }
      }      
    })
    .catch(err => {
      console.log(err);
    });
    return allResults;
}
export async function combineReviews(google_search_dict, google_details_dict)
{
  let finalDict = {};

  finalDict.categories = google_search_dict.types;
  finalDict.price = google_search_dict.price_level;
  finalDict.overallRating = google_search_dict.overallRating;
  finalDict.reviewCount = google_search_dict.totalRatings;

  finalDict.url = google_details_dict.url;

  finalDict.reviews = []
  var tempString = ""
  // Make up id's for the reviews
  for (let i = 0 ; i < google_details_dict.reviews.length; i ++)
  {
    
    finalDict.reviews[i] = {};
    finalDict.reviews[i].id = google_details_dict.reviews[i].id;
    finalDict.reviews[i].rating = google_details_dict.reviews[i].rating;
    finalDict.reviews[i].text   = google_details_dict.reviews[i].text;    
    finalDict.reviews[i].time   = google_details_dict.reviews[i].time;
    finalDict.reviews[i].url = null; 
  }

  return finalDict;



}
