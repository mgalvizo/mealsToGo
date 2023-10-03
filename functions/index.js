// Library has to be installed in the functions directory
const { Client } = require('@googlemaps/google-maps-services-js');
const functions = require('firebase-functions');
const stripeClient = require('stripe')(functions.config().stripe.key);

const { geocodeRequest } = require('./geocode');
const { payRequest } = require('./pay');
const { placesRequest } = require('./places');

// We use the client to make API requests to Places API
const googleClient = new Client({});

exports.geocode = functions.https.onRequest((request, response) => {
    geocodeRequest(request, response, googleClient);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
    placesRequest(request, response, googleClient);
});

exports.pay = functions.https.onRequest((request, response) => {
    payRequest(request, response, stripeClient);
});
