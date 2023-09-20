const url = require('url');

const { MOCKS, addMockImage } = require('./mock');

module.exports.placesRequest = (request, response) => {
    const { location } = url.parse(request.url, true).query;
    const data = MOCKS[location];

    if (data) {
        data.results = data.results.map(addMockImage);
    }

    response.json(data);
};
