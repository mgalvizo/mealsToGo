import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import RestaurantsNavigator from './Restaurants.navigator';
import SettingsNavigator from './Settings.navigator';
import CheckoutNavigator from './checkout.navigator';
import MapScreen from '../../features/map/screens/Map.screen';
import { COLORS } from '../../infrastructure/theme/colors';
import CartProvider from '../../services/cart/cart.context';
import FavouritesProvider from '../../services/favourites/favourites.context';
import LocationProvider from '../../services/location/location.context';
import RestaurantProvider from '../../services/restaurants/restaurants.context';

const Tab = createBottomTabNavigator();

// The keys are the routes and the value the name of the icon
const TAB_ICON = {
    RestaurantsNavigator: 'md-restaurant',
    Map: 'md-map',
    SettingsNavigator: 'md-settings',
    CheckoutNavigator: 'md-cart',
};

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor: COLORS.brand.primary,
        tabBarInactiveTintColor: COLORS.brand.muted,
        headerShown: false,
    };
};

const AppNavigator = () => {
    return (
        <FavouritesProvider>
            <LocationProvider>
                <RestaurantProvider>
                    <CartProvider>
                        <Tab.Navigator screenOptions={createScreenOptions}>
                            <Tab.Screen
                                name="RestaurantsNavigator"
                                component={RestaurantsNavigator}
                                options={{
                                    title: 'Restaurants',
                                }}
                            />
                            <Tab.Screen
                                name="CheckoutNavigator"
                                component={CheckoutNavigator}
                                options={{
                                    title: 'Checkout',
                                }}
                            />
                            <Tab.Screen
                                name="Map"
                                component={MapScreen}
                                options={{
                                    title: 'Map',
                                }}
                            />
                            <Tab.Screen
                                name="SettingsNavigator"
                                component={SettingsNavigator}
                                options={{
                                    title: 'Settings',
                                }}
                            />
                        </Tab.Navigator>
                    </CartProvider>
                </RestaurantProvider>
            </LocationProvider>
        </FavouritesProvider>
    );
};

export default AppNavigator;
