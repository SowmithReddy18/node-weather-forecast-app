const request = require('request');

const getLocation = (address, callback) => {
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic293bWl0aC1yZWRkeSIsImEiOiJja2FhcTBhaGoweXg4MnptdDJ3MHl6ZG41In0.HtAN-plnMubjuNnt8I494g&limit=1`;
    request.get({ uri: mapUrl }, (error, data) => {
        if (error) {
            callback(`Unable to connect to Location Services`);
        } else {
            data = JSON.parse(data.body);
            if (!data.features) {
                callback(`please sepcify the name of the location`);
            } else if (data.features.length == 0) {
                callback(`Could not find the latitude/longitude for the given location, please try with a diffrent search parameter`);
            } else {
                callback(undefined, {
                    latitude: data.features[0].center[1],
                    longitude: data.features[0].center[0],
                    name: data.features[0].place_name
                });
            }
        }
    })
}

const getWeather = (location, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=c4118d4d609895082e01c0fbd318037b&query=${location.latitude},${location.longitude}`;
    request.get({ uri: weatherUrl, json: true }, (error, response) => {
        if (error) {
            callback(`Cannot connect to Weathter services`);
        } else {
            data = response.body;
            if (data.error) {
                callback(`Please specify a valid location identifier using the query parameter.`);
            } else {
                callback(undefined, {
                    locationName: data.location.name,
                    temperature: data.current.temperature,
                    feelslike: data.current.feelslike,
                    precipitation: data.current.precip
                });
            }
        }
    })
}

module.exports = {
    getLocation: getLocation,
    getWeather: getWeather
}