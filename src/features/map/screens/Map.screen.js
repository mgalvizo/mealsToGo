import React, { useContext, useState, useEffect } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import styled from 'styled-components/native';

import { LocationContext } from '../../../services/location/location.context';
import { RestaurantContext } from '../../../services/restaurants/restaurants.context';
import MapCallout from '../components/MapCallout.component';
import Search from '../components/Search.component';

const Map = styled(MapView)`
    height: 100%;
    width: 100%;
`;

const RestaurantMap = ({ navigation }) => {
    const { location } = useContext(LocationContext);
    const { restaurants = [] } = useContext(RestaurantContext);

    const [latDelta, setLatDelta] = useState(0);

    const { lat, lng, viewport } = location;

    // Latitude delta calculation
    useEffect(() => {
        const northeastLat = viewport.northeast.lat;
        const southwestLat = viewport.southwest.lat;

        setLatDelta(northeastLat - southwestLat);
    }, [location, viewport]);

    const renderMarker = restaurants.map(restaurant => {
        return (
            <Marker
                key={restaurant.name}
                title={restaurant.name}
                coordinate={{
                    latitude: restaurant.geometry.location.lat,
                    longitude: restaurant.geometry.location.lng,
                }}
            >
                <Callout
                    onPress={() =>
                        navigation.navigate('RestaurantDetail', { restaurant })
                    }
                >
                    <MapCallout restaurant={restaurant} />
                </Callout>
            </Marker>
        );
    });

    return (
        <>
            <Search />
            <Map
                region={{
                    latitude: lat,
                    longitude: lng,
                    // Zoom level on the map
                    latitudeDelta: latDelta,
                    longitudeDelta: 0.02,
                }}
            >
                {renderMarker}
            </Map>
        </>
    );
};

const MapScreen = () => {
    const { location } = useContext(LocationContext);

    if (!location) {
        return (
            <Map
                region={{
                    latitude: 0,
                    longitude: 0,
                }}
            />
        );
    }

    return <RestaurantMap />;
};

export default MapScreen;
