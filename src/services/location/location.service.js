import camelize from 'camelize';

// ngrok tunnel
const locationRequest = async searchTerm => {
    try {
        const response = await fetch(
            `https://5e8f-2806-108e-24-83f6-9978-635b-d7d8-b13.ngrok-free.app/mealstogo-15801/us-central1/geocode?city=${searchTerm}`,
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
