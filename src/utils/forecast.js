const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=53337186727fb46053341098922d5643&query=' +
    latitude +
    ',' +
    longitude;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location, Try another search!', undefined);
    } else {
      callback(undefined, {
        currentTemp: body.current.temperature,
        feelslike: body.current.feelslike,
        description: body.current.weather_descriptions[0],
      });
    }
  });
};
module.exports = forecast;
