import camelize from 'camelize';

import { host } from '../../utils/env';

const locationRequest = async searchTerm => {
    try {
        const response = await fetch(`${host}/geocode?city=${searchTerm}`);

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
