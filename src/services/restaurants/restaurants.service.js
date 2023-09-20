import camelize from 'camelize';

const restaurantsRequest = async location => {
    try {
        const response = await fetch(
            `https://5e8f-2806-108e-24-83f6-9978-635b-d7d8-b13.ngrok-free.app/mealstogo-15801/us-central1/placesNearby?location=${location}`,
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
