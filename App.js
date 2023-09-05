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

import RestaurantsScreen from './src/features/restaurants/screens/Restaurants.screen';
import { THEME } from './src/infrastructure/theme';

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
                <ExpoStatusBar style="auto" />
                <RestaurantsScreen />
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
