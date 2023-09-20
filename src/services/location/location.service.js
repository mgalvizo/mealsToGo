import camelize from 'camelize';

const locationRequest = async searchTerm => {
    try {
        const response = await fetch(
            `http://127.0.0.1:5001/mealstogo-15801/us-central1/geocode?city=${searchTerm}`,
        );

        const result = await response.json();

        return result;
    } catch (err) {
        console.log(err);
    }
};

const locationTransform = result => {
    const formattedResponse = camelize(result);
    const { geometry = {} } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;

    return { lat, lng, viewport: geometry.viewport };
};

export { locationRequest, locationTransform };
