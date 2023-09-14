import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import AccountScreen from '../../features/account/screens/Account.screen';
import LoginScreen from '../../features/account/screens/Login.screen';
import RegisterScreen from '../../features/account/screens/Register.screen';

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Main" component={AccountScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default AccountNavigator;
