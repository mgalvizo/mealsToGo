import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';
import React from 'react';

import CameraScreen from '../../features/settings/screens/Camera.screen';
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
            <SettingsStack.Screen name="Camera" component={CameraScreen} />
        </SettingsStack.Navigator>
    );
};

export default SettingsNavigator;
