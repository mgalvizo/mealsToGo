const functions = require('firebase-functions');
const url = require('url');

const { MOCKS, addMockImage } = require('./mock');

const addGoogleImage = restaurant => {
    const ref = restaurant.photos[0].photo_reference;

    if (!ref) {
        // Fix picture
        restaurant.photos = [
            'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
        ];

        return restaurant;
    }

    // Getting the key from the secrets uploaded to firebase
    restaurant.photos = [
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
            functions.config().google.key
        }`,
    ];

    return restaurant;
};

module.exports.placesRequest = async (request, response, client) => {
    try {
        const { location, mock } = url.parse(request.url, true).query;

        if (mock === 'true') {
            const data = MOCKS[location];

            if (data) {
                data.results = data.results.map(addMockImage);
            }

            return response.json(data);
        }

        const res = await client.placesNearby({
            params: {
                location,
                radius: 1500,
                type: 'restaurant',
                key: functions.config().google.key,
            },
            timeout: 1000,
        });

        res.data.results = res.data.results.map(addGoogleImage);

        return response.json(res.data);
    } catch (err) {
        response.status(400);
        return response.send(err.response.data.error_message);
    }
};
