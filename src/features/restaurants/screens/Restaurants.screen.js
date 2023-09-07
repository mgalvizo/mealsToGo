import React, { useContext } from 'react';
import { Searchbar, ActivityIndicator, Colors } from 'react-native-paper';
import styled from 'styled-components/native';

import Spacer from '../../../components/Spacer/Spacer.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { RestaurantContext } from '../../../services/restaurants/restaurants.context';
import RestaurantInfoCard from '../components/RestaurantInfoCard.component';

// A theme can also be passed down to a component using the theme prop
const SearchContainer = styled.View`
    padding: ${props => props.theme.SPACE[3]};
`;

// Gets access to the attributes of the FlatList
const RestaurantList = styled.FlatList.attrs({
    // These styles will be applied to the scroll view content container which wraps all of the child views
    contentContainerStyle: {
        padding: 16,
    },
})``;

const Loading = styled(ActivityIndicator).attrs(({ theme }) => {
    return {
        size: theme.SIZES[2],
        color: theme.COLORS.brand.primary,
    };
})`
    margin-left: -25px;
`;

const LoadingContainer = styled.View`
    position: absolute;
    top: 50%;
    left: 50%;
`;

const Restaurants = () => {
    const { restaurants, isLoading, error } = useContext(RestaurantContext);

    return (
        <SafeArea>
            <SearchContainer>
                <Searchbar />
            </SearchContainer>
            {isLoading && (
                <LoadingContainer>
                    <Loading animating />
                </LoadingContainer>
            )}
            <RestaurantList
                data={restaurants}
                keyExtractor={restaurant => restaurant.name}
                renderItem={({ item }) => {
                    return (
                        <Spacer position="bottom" size="large">
                            <RestaurantInfoCard restaurant={item} />
                        </Spacer>
                    );
                }}
            />
        </SafeArea>
    );
};

export default Restaurants;
