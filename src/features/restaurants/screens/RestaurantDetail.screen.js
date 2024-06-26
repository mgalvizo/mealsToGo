import React, { useReducer, useContext } from 'react';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

import Spacer from '../../../components/Spacer/Spacer.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { CartContext } from '../../../services/cart/cart.context';
import RestaurantInfoCard from '../components/RestaurantInfoCard.component';
import { OrderButton } from '../components/RestaurantList.styles';

const initialState = {
    breakfastExpanded: false,
    lunchExpanded: false,
    dinnerExpanded: false,
    drinksExpanded: false,
};

const listReducer = (state, action) => {
    const { type } = action;

    switch (type) {
        case 'BREAKFAST_EXPANDED':
            return { ...state, breakfastExpanded: !state.breakfastExpanded };
        case 'LUNCH_EXPANDED':
            return { ...state, lunchExpanded: !state.lunchExpanded };
        case 'DINNER_EXPANDED':
            return { ...state, dinnerExpanded: !state.dinnerExpanded };
        case 'DRINKS_EXPANDED':
            return { ...state, drinksExpanded: !state.drinksExpanded };
        default:
            return state;
    }
};

// Access to route prop since this is a screen component in the navigator
const RestaurantDetail = ({ route, navigation }) => {
    const { restaurant } = route.params;
    const [state, dispatch] = useReducer(listReducer, initialState);
    const { addToCart } = useContext(CartContext);

    const { breakfastExpanded, lunchExpanded, dinnerExpanded, drinksExpanded } =
        state;

    return (
        <SafeArea>
            <RestaurantInfoCard restaurant={restaurant} />
            <ScrollView>
                <List.Accordion
                    title="Breakfast"
                    left={props => <List.Icon {...props} icon="bread-slice" />}
                    expanded={breakfastExpanded}
                    onPress={() => dispatch({ type: 'BREAKFAST_EXPANDED' })}
                >
                    <List.Item title="Eggs Benedict" />
                    <Divider />
                    <List.Item title="Classic Breakfast" />
                </List.Accordion>
                <Divider />
                <List.Accordion
                    title="Lunch"
                    left={props => <List.Icon {...props} icon="hamburger" />}
                    expanded={lunchExpanded}
                    onPress={() => dispatch({ type: 'LUNCH_EXPANDED' })}
                >
                    <List.Item title="Burger w/ Fries" />
                    <Divider />
                    <List.Item title="Steak Sandwich" />
                    <Divider />
                    <List.Item title="Mushroom Soup" />
                </List.Accordion>
                <Divider />
                <List.Accordion
                    title="Dinner"
                    left={props => <List.Icon {...props} icon="food-variant" />}
                    expanded={dinnerExpanded}
                    onPress={() => dispatch({ type: 'DINNER_EXPANDED' })}
                >
                    <List.Item title="Spaghetti Bolognese" />
                    <Divider />
                    <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
                    <Divider />
                    <List.Item title="Steak Frites" />
                </List.Accordion>
                <Divider />
                <List.Accordion
                    title="Drinks"
                    left={props => <List.Icon {...props} icon="cup" />}
                    expanded={drinksExpanded}
                    onPress={() => dispatch({ type: 'DRINKS_EXPANDED' })}
                >
                    <List.Item title="Coffee" />
                    <Divider />
                    <List.Item title="Tea" />
                    <Divider />
                    <List.Item title="Modelo" />
                    <Divider />
                    <List.Item title="Coke" />
                    <Divider />
                    <List.Item title="Fanta" />
                </List.Accordion>
            </ScrollView>
            <Spacer position="bottom" size="large">
                <OrderButton
                    icon="currency-usd"
                    mode="contained"
                    onPress={() => {
                        addToCart({ item: 'special', price: 1299 }, restaurant);
                        navigation.navigate('CheckoutNavigator');
                    }}
                >
                    Order Special Only 12.99!
                </OrderButton>
            </Spacer>
        </SafeArea>
    );
};

export default RestaurantDetail;
