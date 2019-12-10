const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Defines path for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Tam'
  });
});
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Tam'
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is helpfull text!',
    title: 'Help',
    name: 'Tam'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address term!'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    error: 'Help article not found!',
    name: 'Tam'
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    error: 'Page Not Found!',
    name: 'Tam'
  });
});

app.listen(port, () => {
  console.log('Server is running on port' + port);
});
