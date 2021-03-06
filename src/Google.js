import React, { useState } from "react";
import {
  getBusinessLocations,
  getBusinessReviews,
  combineReviews
} from "./GoogleApi";

function Yelp() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [reviews, setReviews] = useState([]);

  const handleSearchChange = event => {
    const query = event.target.value;
    setSearch(query);
  };

  const handleLocationChange = event => {
    const location = event.target.value;
    setLocation(location);
  };

  const getYelpData = async () => {
    if (search !== "" && location !== "") {
      //   let businessData = await getBusinessLocations(search, location);
      //   if (businessData !== null) {
      //     setData(businessData);
      //     let reviewData = await getBusinessReviews(businessData.id);
      //     if (reviewData !== null) {
      //       setReviews(reviewData);
      //     }
      //   }
      let longitude = 43.09519;
      let latitude = -77.63296;
      let radius = 5000;
      let businessData = await getBusinessLocations(
        search,
        longitude,
        latitude,
        radius
      );

      let businessId = businessData.id;
      let businessDetails = await getBusinessReviews(businessId);
      let finalDict = await combineReviews(businessData, businessDetails);
    } else {
      console.log("provide search term and location");
    }
  };

  return (
    <div>
      <input
        type="text"
        className="input"
        placeholder="Search for business"
        value={search}
        onChange={handleSearchChange}
      />
      <input
        type="text"
        className="input"
        placeholder="Location"
        value={location}
        onChange={handleLocationChange}
      />
      <button className="button is-info" onClick={() => getYelpData()}>
        Search
      </button>
      <div>
        {data.id} {data.name} {data.overallRating}{" "}
        {`coordinates ${data.coordinates}`}
        <ul>
          {reviews.map(review => (
            <li>{review.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Yelp;
