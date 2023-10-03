import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import CheckoutScreen from '../../features/checkout/screens/Checkout.screen';
import CheckoutErrorScreen from '../../features/checkout/screens/CheckoutError.screen';
import CheckoutSuccessScreen from '../../features/checkout/screens/CheckoutSuccess.screen';

const CheckoutStack = createStackNavigator();

const CheckoutNavigator = () => {
    return (
        <CheckoutStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <CheckoutStack.Screen name="Checkout" component={CheckoutScreen} />
            <CheckoutStack.Screen
                name="CheckoutSuccess"
                component={CheckoutSuccessScreen}
            />
            <CheckoutStack.Screen
                name="CheckoutError"
                component={CheckoutErrorScreen}
            />
        </CheckoutStack.Navigator>
    );
};

export default CheckoutNavigator;
