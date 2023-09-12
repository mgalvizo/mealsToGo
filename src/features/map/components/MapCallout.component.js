import React from 'react';

import CompactRestaurantInfo from '../../../components/Restaurant/CompactRestaurantInfo.component';

const MapCallout = ({ restaurant }) => {
    return <CompactRestaurantInfo isMap restaurant={restaurant} />;
};

export default MapCallout;
