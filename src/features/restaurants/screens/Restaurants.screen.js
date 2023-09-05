import React from 'react';
import {
    // StyleSheet,
    StatusBar,
    // Platform
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

import RestaurantInfoCard from '../components/RestaurantInfoCard.component';

const SafeArea = styled.SafeAreaView`
    flex: 1;
    /* Guard for iOS, StatusBar does NOT exist on iOS */
    ${StatusBar.currentHeight && `padding-top: ${StatusBar.currentHeight}px`}
`;

// A theme can also be passed down to a component using the theme prop
const SearchContainer = styled.View`
    padding: ${props => props.theme.SPACE[3]};
`;

const RestaurantListContainer = styled.View`
    flex: 1;
    padding: ${props => props.theme.SPACE[3]};
`;

const Restaurants = () => {
    return (
        <SafeArea>
            <SearchContainer>
                <Searchbar />
            </SearchContainer>
            <RestaurantListContainer>
                <RestaurantInfoCard />
            </RestaurantListContainer>
        </SafeArea>
    );
};

export default Restaurants;

// const styles = StyleSheet.create({});
