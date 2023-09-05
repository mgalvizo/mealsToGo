import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import RestaurantsScreen from './src/features/restaurants/screens/Restaurants.screen';

const App = () => {
    return (
        <>
            <ExpoStatusBar style="auto" />
            <RestaurantsScreen />
        </>
    );
};

export default App;

const styles = StyleSheet.create({});
