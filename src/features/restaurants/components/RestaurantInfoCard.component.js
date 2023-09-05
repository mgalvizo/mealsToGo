import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

const RestaurantCard = styled(Card)`
    background-color: white;
`;

const RestaurantCardCover = styled(Card.Cover)`
    padding: 20px;
    background-color: white;
`;

const Title = styled.Text`
    /* Write CSS, it will get translated to React Native's ecosystem */
    padding: 16px;
    color: red;
`;

const RestaurantInfo = ({ restaurant = {} }) => {
    // Example of the data to work with, API shape is different
    const {
        name = 'Some Restaurant',
        icon,
        photos = [
            'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
        ],
        address = '100 some random street',
        isOpenNow = true,
        rating = 4,
        isClosedTemporarily,
    } = restaurant;

    return (
        <RestaurantCard elevation={5}>
            <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
            <Title>{name}</Title>
        </RestaurantCard>
    );
};

export default RestaurantInfo;

const styles = StyleSheet.create({});
