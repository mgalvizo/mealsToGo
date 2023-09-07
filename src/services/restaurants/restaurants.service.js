import camelize from 'camelize';

import { MOCKS, MOCK_IMAGES } from './mock';

const restaurantsRequest = (location = '37.7749295,-122.4194155') => {
    return new Promise((resolve, reject) => {
        const mock = MOCKS[location];

        if (!mock) {
            reject('Not found');
        }

        resolve(mock);
    });
};

const restaurantsTransform = ({ results = [] }) => {
    const mappedResults = results.map(restaurant => {
        restaurant.photos = restaurant.photos.map(photo => {
            return MOCK_IMAGES[
                Math.ceil(Math.random() * (MOCK_IMAGES.length - 1))
            ];
        });

        return {
            ...restaurant,
            isOpenNow:
                restaurant.opening_hours && restaurant.opening_hours.open_now,
            isClosedTemporarily:
                restaurant.business_status === 'CLOSED_TEMPORARILY',
        };
    });

    // recursively transform key strings to camel-case
    return camelize(mappedResults);
};

export { restaurantsRequest, restaurantsTransform };
