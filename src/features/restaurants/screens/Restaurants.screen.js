import React, { useContext } from 'react';
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native';

import Spacer from '../../../components/Spacer/Spacer.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { RestaurantContext } from '../../../services/restaurants/restaurants.context';
import RestaurantInfoCard from '../components/RestaurantInfoCard.component';
import Search from '../components/Search.component';

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
            {isLoading && (
                <LoadingContainer>
                    <Loading animating />
                </LoadingContainer>
            )}
            <Search />
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
