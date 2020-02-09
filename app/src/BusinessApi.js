import { getYelpBusinessData } from "./YelpApi";
import { getFourSquareBusinessData } from "./FourSquareApi";

export async function getBusinessData(searchTerm, location) {
  let result = {};
  let yelpData = await getYelpBusinessData(searchTerm, location);
  console.log(yelpData);
  if (yelpData !== null) {
    let overallInfo = yelpData.overallInfo;
    let longitude = overallInfo.coordinates.longitude;
    let latitude = overallInfo.coordinates.latitude;
    result.businessInfo = overallInfo;
    result.yelp = {
      detailedInfo: yelpData.detailedInfo,
      reviews: yelpData.reviews
    };
    let fourSquareData = await getFourSquareBusinessData(
      searchTerm,
      longitude,
      latitude
    );
    console.log(fourSquareData);
    if (fourSquareData !== null) {
      result.foursquare = {
        detailedInfo: fourSquareData.detailedInfo,
        reviews: fourSquareData.reviews
      };
    } else {
      result.foursquare = null;
    }
  }
}
