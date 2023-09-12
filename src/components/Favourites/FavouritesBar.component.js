import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import CompactRestaurantInfo from '../Restaurant/CompactRestaurantInfo.component';
import Spacer from '../Spacer/Spacer.component';
import Text from '../Typography/Text.component';

const FavouritesWrapper = styled.View`
    padding: 10px;
`;

const FavouritesBar = ({ favourites, onNavigate }) => {
    if (!favourites.length) {
        return null;
    }

    return (
        <FavouritesWrapper>
            <Spacer variant="left.large">
                <Text variant="caption">Favourites</Text>
            </Spacer>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={favourites}
                keyExtractor={restaurant => restaurant.name}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                onNavigate('RestaurantDetail', {
                                    restaurant: item,
                                })
                            }
                        >
                            <CompactRestaurantInfo restaurant={item} />
                        </TouchableOpacity>
                    );
                }}
            />
        </FavouritesWrapper>
    );
};

export default FavouritesBar;
