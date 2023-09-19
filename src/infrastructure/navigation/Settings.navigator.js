import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';

import FavouritesScreen from '../../features/settings/screens/Favourites.screen';
import SettingsScreen from '../../features/settings/screens/Settings.screen';

const SettingsStack = createStackNavigator();

const SettingsNavigator = () => {
    return (
        <SettingsStack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerMode: 'screen',
            }}
        >
            <SettingsStack.Screen
                options={{
                    headerShown: false,
                }}
                name="Settings"
                component={SettingsScreen}
            />
            <SettingsStack.Screen
                name="Favourites"
                component={FavouritesScreen}
            />
        </SettingsStack.Navigator>
    );
};

export default SettingsNavigator;
