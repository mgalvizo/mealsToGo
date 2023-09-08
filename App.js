import { Ionicons } from '@expo/vector-icons';
import {
    useFonts as useLato,
    Lato_400Regular,
    // Lato_700Bold,
} from '@expo-google-fonts/lato';
import {
    useFonts as useOswald,
    Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import SafeArea from './src/components/Utils/SafeArea.component';
import RestaurantsScreen from './src/features/restaurants/screens/Restaurants.screen';
import { THEME } from './src/infrastructure/theme';
import LocationProvider from './src/services/location/location.context';
import RestaurantProvider from './src/services/restaurants/restaurants.context';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

// The keys are the routes and the value the name of the icon
const TAB_ICON = {
    Restaurants: 'md-restaurant',
    Map: 'md-map',
    Settings: 'md-settings',
};

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
        tabBarIcon: ({ size, color }) => (
            <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
    };
};

const App = () => {
    const [oswaldLoaded, oswaldError] = useOswald({
        Oswald_400Regular,
    });

    const [latoLoaded, latoError] = useLato({
        Lato_400Regular,
        // Lato_700Bold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (oswaldLoaded || oswaldError || latoLoaded || latoError) {
            await SplashScreen.hideAsync();
        }
    }, [oswaldLoaded, oswaldError, latoLoaded, latoError]);

    if ((!oswaldLoaded && !oswaldError) || (!latoLoaded && !latoError)) {
        return null;
    }

    return (
        <View style={styles.appContainer} onLayout={onLayoutRootView}>
            <ThemeProvider theme={THEME}>
                <LocationProvider>
                    <RestaurantProvider>
                        <NavigationContainer>
                            <Tab.Navigator screenOptions={createScreenOptions}>
                                <Tab.Screen
                                    name="Restaurants"
                                    component={RestaurantsScreen}
                                />
                            </Tab.Navigator>
                        </NavigationContainer>
                        <ExpoStatusBar style="auto" />
                    </RestaurantProvider>
                </LocationProvider>
            </ThemeProvider>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
});
