const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views&partials Path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Render static assests
app.use(express.static(publicDirPath));

// Render dynamic pages using Handlebars
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'mmrza',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'mmrza',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'mmrza',
    helpMsg: 'This website is very easy to use. Just enter the name of the desired location or address in the box and see the result.',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) { // Check if address not provided then Send Err
    return res.send({
      error: 'Address must be provided!',
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, { currentTemp, feelslike, description, humidity, wind_speed, localtime } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        address,
        location,
        description,
        currentTemp,
        feelslike,
        humidity,
        wind_speed,
        localtime,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'Help article not found.',
    title: '404',
    name: 'mmrza',
  });
});

// Setup 404 page
app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page not found.',
    title: '404',
    name: 'mmrza',
  });
});

// Starting the server
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
