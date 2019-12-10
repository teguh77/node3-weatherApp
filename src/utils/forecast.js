const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/98a512b3cac027f4a70ea20c8a413ea7/' +
    latitude +
    ',' +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      console.log(body.daily.data[0]);
      callback(
        undefined,
        body.daily.data[0].summary +
          'it is currently ' +
          body.currently.temperature +
          ' degrees out. This high today is ' +
          body.daily.data[0].temperatureHigh +
          ' with a low of ' +
          body.daily.data[0].temperatureLow +
          '. There is a ' +
          body.currently.precipProbability +
          '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;
