import 'react-native-gesture-handler';
import {
    useFonts as useLato,
    Lato_400Regular,
    // Lato_700Bold,
} from '@expo-google-fonts/lato';
import {
    useFonts as useOswald,
    Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import Navigation from './src/infrastructure/navigation';
import { THEME } from './src/infrastructure/theme';
import AuthenticationProvider from './src/services/authentication/authentication.context';
import FavouritesProvider from './src/services/favourites/favourites.context';
import LocationProvider from './src/services/location/location.context';
import RestaurantProvider from './src/services/restaurants/restaurants.context';

SplashScreen.preventAutoHideAsync();

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
                <AuthenticationProvider>
                    <FavouritesProvider>
                        <LocationProvider>
                            <RestaurantProvider>
                                <Navigation />
                            </RestaurantProvider>
                        </LocationProvider>
                    </FavouritesProvider>
                </AuthenticationProvider>
            </ThemeProvider>
            <ExpoStatusBar style="auto" />
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
});
