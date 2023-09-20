const url = require('url');

const { LOCATIONS: locationsMock } = require('./geocode.mock');

module.exports.geocodeRequest = (request, response) => {
    const { city } = url.parse(request.url, true).query;
    const locationMock = locationsMock[city.toLowerCase()];

    response.json(locationMock);
};
