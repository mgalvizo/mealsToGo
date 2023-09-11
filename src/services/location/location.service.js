import camelize from 'camelize';

import { LOCATIONS } from './location.mock';

const locationRequest = searchTerm => {
    return new Promise((resolve, reject) => {
        const locationMock = LOCATIONS[searchTerm];

        if (!locationMock) {
            reject('Location Not Found.');
        }

        resolve(locationMock);
    });
};

const locationTransform = result => {
    const formattedResponse = camelize(result);
    const { geometry = {} } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;

    return { lat, lng, viewport: geometry.viewport };
};

export { locationRequest, locationTransform };
