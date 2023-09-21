import camelize from 'camelize';

import { host, isMock } from '../../utils/env';

const locationRequest = async searchTerm => {
    try {
        const response = await fetch(
            `${host}/geocode?city=${searchTerm}&mock=${isMock}`,
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
