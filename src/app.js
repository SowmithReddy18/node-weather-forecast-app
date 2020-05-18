const path = require('path');
const express = require('express');
const hbs = require('hbs');
const weatherService = require('../../weather-app/utils/utils.js')

const rootPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(rootPath));

app.get('/', (req, res) => {
    res.render('weather', {
        title: 'Weather App',
        name: 'Sowmith'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        description: 'Web Development is fun :)',
        name: 'Sowmith Reddy'
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
        weatherService.getLocation(req.query.address, (error, location) => {
            if (location) {
                weatherService.getWeather({ latitude: location.latitude, longitude: location.longitude }, (error, response) => {
                    if (response) {
                        res.send(response);
                    } else if (error) {
                        res.send(error);
                    }
                })
            } else if (error) {
                res.send(error);
            }
        })
    } else {
        res.send({
            error: "Please specify an address !"
        })
    }
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404 Not Found',
        name: 'Sowmith Reddy'
    })
})

app.listen(3000, () => {
    console.log('server started at port 3000');
});