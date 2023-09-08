import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';

import RestaurantDetailScreen from '../../features/restaurants/screens/RestaurantDetail.screen';
import RestaurantsScreen from '../../features/restaurants/screens/Restaurants.screen';

const RestaurantStack = createStackNavigator();

const Restaurants = () => {
    return (
        <RestaurantStack.Navigator
            screenOptions={{
                ...TransitionPresets.ModalPresentationIOS,
                headerShown: false,
            }}
        >
            <RestaurantStack.Screen
                name="Restaurants"
                component={RestaurantsScreen}
            />
            <RestaurantStack.Screen
                name="RestaurantDetail"
                component={RestaurantDetailScreen}
            />
        </RestaurantStack.Navigator>
    );
};

export default Restaurants;
