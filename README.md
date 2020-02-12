## About

This project was built during [Brickhack 6](https://brickhack6.devpost.com/) as a way to help foodies
gain better insight as to what others are saying about a restaurant/establishment so that they can make a more
informed chice of whether to try it out.

### Inspiration

We started with the idea of tackling Wegman's challenge and knew we wanted to help users compare products to save time and money and make the shopping experience seamless.

We ran into the problem of not knowing if products a universal id across platforms and Wegman's was the only API we had. Other supermarkets like Walmart did not have one so we couldn't compare products.

We then found that when looking at places to eat, we always found that we were exclusively looking at Yelp for reviews from the community. However, we knew that there was a whole other community within Google Local Guides that have more reviews from people so we thought it would be a good idea to put the two together and have a site where the reviews were an aggregation from both sources for a more unbiased/harsh review. We then decided to add Foursquare as well as we knew it also might have some good reviews from the small community it has.

### What it does

A user can look up a restaurant and Good Eats will give a comprehensive review from multiple sources (Yelp, Google Local Guides, Foursquare).

Reviews include cards for each source that let the user know the overall rating and total number of reviews in addition
to a couple of written reviews grabbed from the sources themselves.

### How it was built

- [Node](https://nodejs.org/en/)
- [React.js](https://reactjs.org/)
- [Yelp API](https://www.yelp.com/developers)
- [Google Maps Places API](https://developers.google.com/maps/documentation)
- [Foursquare Places API](https://developer.foursquare.com/)

## Built By

- [Andrew Lin](https://github.com/al3792)
- [Calvin To](https://github.com/calvintoes)
- [Jason Au](https://github.com/jxa2009)
- [Justin Liu](https://github.com/liujustin/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run it

In the project directory, run:

1. `yarn install` in order to download all the necessary packages
2. `yarn start` in order to run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
3. Put a restaurant name (Exact please) into the `What I want` input box that you want to search for
4. Fill out the location where it is `Ex: Rochester, NY`
5. Click search and wait for the site to load your reviews!
