import { getYelpBusinessData } from "./YelpApi";
import { getFourSquareBusinessData } from "./FourSquareApi";
import { combineReviews } from "./GoogleApi";

export async function getBusinessData(searchTerm, location) {
  let result = {};
  let yelpData = await getYelpBusinessData(searchTerm, location);
  if (yelpData !== null) {
    let overallInfo = yelpData.overallInfo;
    let latitude = overallInfo.coordinates.latitude;
    let longitude = overallInfo.coordinates.longitude;
    result.businessInfo = overallInfo;
    result.yelp = {
      detailedInfo: yelpData.detailedInfo,
      reviews: yelpData.reviews
    };
    let fourSquareData = await getFourSquareBusinessData(
      searchTerm,
      latitude,
      longitude
    );
    if (fourSquareData !== null) {
      result.foursquare = {
        detailedInfo: fourSquareData.detailedInfo,
        reviews: fourSquareData.reviews
      };
    } else {
      result.foursquare = null;
    }
    let defaultRadius = 5000;
    let googleData = await combineReviews(
      searchTerm,
      latitude,
      longitude,
      defaultRadius
    );
    if (googleData !== null) {
      result.google = {
        detailedInfo: googleData.detailedInfo,
        reviews: googleData.reviews
      };
    } else {
      result.google = null;
    }
  }
  return result;
}
