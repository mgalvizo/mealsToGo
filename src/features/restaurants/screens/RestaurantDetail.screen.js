import React, { useReducer } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import RestaurantInfoCard from '../components/RestaurantInfoCard.component';
import SafeArea from '../../../components/Utils/SafeArea.component';

const initialState = {
    breakfastExpanded: false,
    lunchExpanded: false,
    dinnerExpanded: false,
    drinksExpanded: false,
};

const listReducer = (state, action) => {
    const { type, payload } = action;

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
const RestaurantDetail = ({ route }) => {
    const { restaurant } = route.params;
    const [state, dispatch] = useReducer(listReducer, initialState);

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
                    <List.Item title="Classic Breakfast" />
                </List.Accordion>
                <List.Accordion
                    title="Lunch"
                    left={props => <List.Icon {...props} icon="hamburger" />}
                    expanded={lunchExpanded}
                    onPress={() => dispatch({ type: 'LUNCH_EXPANDED' })}
                >
                    <List.Item title="Burger w/ Fries" />
                    <List.Item title="Steak Sandwich" />
                    <List.Item title="Mushroom Soup" />
                </List.Accordion>
                <List.Accordion
                    title="Dinner"
                    left={props => <List.Icon {...props} icon="food-variant" />}
                    expanded={dinnerExpanded}
                    onPress={() => dispatch({ type: 'DINNER_EXPANDED' })}
                >
                    <List.Item title="Spaghetti Bolognese" />
                    <List.Item title="Veal Cutlet with Chicken Mushroom Rotini" />
                    <List.Item title="Steak Frites" />
                </List.Accordion>
                <List.Accordion
                    title="Drinks"
                    left={props => <List.Icon {...props} icon="cup" />}
                    expanded={drinksExpanded}
                    onPress={() => dispatch({ type: 'DRINKS_EXPANDED' })}
                >
                    <List.Item title="Coffee" />
                    <List.Item title="Tea" />
                    <List.Item title="Modelo" />
                    <List.Item title="Coke" />
                    <List.Item title="Fanta" />
                </List.Accordion>
            </ScrollView>
        </SafeArea>
    );
};

export default RestaurantDetail;