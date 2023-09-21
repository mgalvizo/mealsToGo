const functions = require('firebase-functions');
const url = require('url');

const { LOCATIONS: locationsMock } = require('./geocode.mock');

module.exports.geocodeRequest = async (request, response, client) => {
    try {
        const { city, mock } = url.parse(request.url, true).query;

        if (mock === 'true') {
            const locationMock = locationsMock[city.toLowerCase()];

            return response.json(locationMock);
        }

        const res = await client.geocode({
            params: {
                address: city,
                // Getting the key from the secrets uploaded to firebase
                key: functions.config().google.key,
            },
            timeout: 1000,
        });

        return response.json(res.data);
    } catch (err) {
        response.status(400);
        return response.send(err.response.data.error_message);
    }
};
