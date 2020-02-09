import axios from "axios";

const CLIENT_ID = "U3C4SCWSGZUAJNCXZCSUKASKCU00PBJ2XBWCGES2AMD4SM4R";
const CLIENT_SECRET = "BWTDZTNSPCWV2W3CWKISSLTNKFVWM4YWLFP1G4IITKDVLGEP";

export async function getFourSquareBusinessData(
  search_name,
  latitude,
  longitude
) {
  let businessId = null;

  let totaltipCount = null;
  let OverallRating = null;
  let Category = null;
  let fourSquareURL = null;
  let pricetier = null;
  let tipObject = null;

  let tips;

  let businessObject = null;
  await axios
    .get(
      `https://api.foursquare.com/v2/venues/search?intent=match&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&name=${search_name}&ll=${latitude},${longitude}&v=20200208`
    )
    .then(res => {
      const businessVenue = res.data.response.venues;
      if (businessVenue !== undefined && businessVenue.length > 0) {
        businessId = businessVenue[0].id;
      }
    })
    .catch(err => {
      console.log(err);
    });
  if (businessId !== null) {
    await axios
      .get(
        `https://api.foursquare.com/v2/venues/${businessId}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20200209`
      )
      .then(res => {
        const businessVenue = res.data.response.venue;
        if (businessVenue !== undefined) {
          totaltipCount = businessVenue.stats.tipCount;
          OverallRating = businessVenue.rating / 2;
          Category = businessVenue.categories.map(category => category.name);
          fourSquareURL = businessVenue.canonicalUrl;
          pricetier = businessVenue.price.tier;
        }
      })
      .catch(err => {
        console.log(err);
      });

    await axios
      .get(
        `https://api.foursquare.com/v2/venues/${businessId}/tips?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20200209`
      )
      .then(res => {
        let tipsResult = res.data.response.tips.items;
        if (tipsResult !== undefined && tipsResult.length > 0) {
          tips = res.data.response.tips.items[0];
          var date = new Date(tips.createdAt);
          var year = date.getFullYear();
          var month = ("0" + (date.getMonth() + 1)).slice(-2);
          var day = ("0" + date.getDate()).slice(-2);
          tipObject = {
            id: tips.id,
            rating: null,
            userName: `${tips.user.firstName} ${tips.user.lastName}`,
            text: tips.text,
            timeCreated: `${month}-${day}-${year}`,
            url: tips.canonicalUrl
          };
        }
        if(tipObject === null) {
          tipObject = []
        } else {
          tipObject = [tipObject]
        }
        businessObject = {
          detailedInfo: {
            id: businessId,
            reviewCount: totaltipCount,
            overallRating: OverallRating,
            categories: Category,
            url: fourSquareURL,
            price: "$".repeat(pricetier)
          },
          reviews: tipObject
        };
      })
      .catch(err => {
        console.log(err);
      });
  }

  return businessObject;
}
