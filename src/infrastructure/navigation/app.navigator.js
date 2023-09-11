import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import RestaurantsNavigator from './Restaurants.navigator';
import SafeArea from '../../components/Utils/SafeArea.component';
import MapScreen from '../../features/map/screens/Map.screen';

const Tab = createBottomTabNavigator();

// The keys are the routes and the value the name of the icon
const TAB_ICON = {
    RestaurantsNavigator: 'md-restaurant',
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
        headerShown: false,
    };
};

const AppNavigator = () => {
    return (
        <NavigationContainer>
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
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
