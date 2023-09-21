// Library has to be installed in the functions directory
const { Client } = require('@googlemaps/google-maps-services-js');
const functions = require('firebase-functions');

const { geocodeRequest } = require('./geocode');
const { placesRequest } = require('./places');

// We use the client to make API requests to Places API
const client = new Client({});

exports.geocode = functions.https.onRequest((request, response) => {
    geocodeRequest(request, response, client);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
    placesRequest(request, response, client);
});
