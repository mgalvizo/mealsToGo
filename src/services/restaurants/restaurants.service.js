import camelize from 'camelize';

import { host } from '../../utils/env';

const restaurantsRequest = async location => {
    try {
        const response = await fetch(
            `${host}/placesNearby?location=${location}`,
        );

        const result = await response.json();

        return result;
    } catch (err) {
        console.log(err);
    }
};

const restaurantsTransform = ({ results = [] }) => {
    const mappedResults = results.map(restaurant => {
        return {
            ...restaurant,
            address: restaurant.vicinity,
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
