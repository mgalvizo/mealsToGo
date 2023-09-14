import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Text, Button } from 'react-native';

import RestaurantsNavigator from './Restaurants.navigator';
import SafeArea from '../../components/Utils/SafeArea.component';
import MapScreen from '../../features/map/screens/Map.screen';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import FavouritesProvider from '../../services/favourites/favourites.context';
import LocationProvider from '../../services/location/location.context';
import RestaurantProvider from '../../services/restaurants/restaurants.context';

const Tab = createBottomTabNavigator();

// The keys are the routes and the value the name of the icon
const TAB_ICON = {
    RestaurantsNavigator: 'md-restaurant',
    Map: 'md-map',
    Settings: 'md-settings',
};

const Settings = () => {
    const { onLogout } = useContext(AuthenticationContext);

    return (
        <SafeArea>
            <Text>Settings</Text>
            <Button title="Logout" onPress={() => onLogout()} />
        </SafeArea>
    );
};

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
    };
};

const AppNavigator = () => {
    return (
        <FavouritesProvider>
            <LocationProvider>
                <RestaurantProvider>
                    <Tab.Navigator screenOptions={createScreenOptions}>
                        <Tab.Screen
                            name="RestaurantsNavigator"
                            component={RestaurantsNavigator}
                            options={{
                                title: 'Restaurants',
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
                            name="Settings"
                            component={Settings}
                            options={{
                                title: 'Settings',
                            }}
                        />
                    </Tab.Navigator>
                </RestaurantProvider>
            </LocationProvider>
        </FavouritesProvider>
    );
};

export default AppNavigator;
