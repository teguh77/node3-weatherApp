const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    '.json?access_token=pk.eyJ1IjoidGVndWg3IiwiYSI6ImNrMmd3N2NpajAwb2YzbG9ia3BlMzdjZ2IifQ.2GXhXwD6vHGeDXWmWfiR-w&limit=1';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to colection services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try other search', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};
module.exports = geocode;
