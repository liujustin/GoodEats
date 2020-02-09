import axios from "axios";

const CLIENT_ID = "F5OMA1SXHWA1HYHGWS2WRKHZVO5ZKQWGWWWJTXCCPBIUWNI4";
const CLIENT_SECRET = "A4FD1NHAGNCRHVDGG14XNAZTFT0ZYRHBTJ24AXWDCNWNGCRQ";

export async function getBusinessData(search_name, long, lat)
{
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
    .get(`https://api.foursquare.com/v2/venues/search?intent=match&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&name=${search_name}&ll=${long},${lat}&v=20200208`)
    .then(res => {
        businessId = res.data.response.venues[0].id;
    })
    
    await axios
    .get(`https://api.foursquare.com/v2/venues/${businessId}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20200208`)
    .then(res => {
        totaltipCount = res.data.response.venue.stats.tipCount
        OverallRating = (res.data.response.venue.rating)/2
        Category = res.data.response.venue.categories
        fourSquareURL = res.data.response.venue.canonicalUrl
        pricetier = res.data.response.venue.price.tier
    })
    
    await axios
    .get(`https://api.foursquare.com/v2/venues/${businessId}/tips?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20200208`)
    .then(res => {
        tips = res.data.response.tips.items[0]
        var date = new Date(tips.createdAt);
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        tipObject = {
            id : tips.id,
            rating : null,
            user : `${tips.user.firstName} ${tips.user.lastName}`,
            text : tips.text,
            timeCreated : `${month}-${day}-${year}`,
            url : tips.canonicalUrl
        }
        businessObject = {
            id : businessId,
            reviewCount : totaltipCount,
            overallRating : OverallRating,
            categories : Category,
            reviews : [tipObject],
            url : fourSquareURL,
            price : "$".repeat(pricetier)
        }
    })
    
    return businessObject
}

