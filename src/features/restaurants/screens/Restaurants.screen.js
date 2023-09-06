import React from 'react';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

import Spacer from '../../../components/Spacer/Spacer.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
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

const Restaurants = () => {
    return (
        <SafeArea>
            <SearchContainer>
                <Searchbar />
            </SearchContainer>
            <RestaurantList
                data={[
                    { name: 1 },
                    { name: 2 },
                    { name: 3 },
                    { name: 4 },
                    { name: 5 },
                    { name: 6 },
                    { name: 7 },
                    { name: 8 },
                    { name: 9 },
                    { name: 10 },
                ]}
                keyExtractor={restaurant => restaurant.name}
                renderItem={() => {
                    return (
                        <Spacer position="bottom" size="large">
                            <RestaurantInfoCard />
                        </Spacer>
                    );
                }}
            />
        </SafeArea>
    );
};

export default Restaurants;
