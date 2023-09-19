import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Spacer from '../../../components/Spacer/Spacer.component';
import Text from '../../../components/Typography/Text.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard.component';
import { RestaurantList } from '../../restaurants/components/RestaurantList.styles';

const NoFavouritesArea = styled(SafeArea)`
    align-items: center;
    justify-content: center;
`;

const FavouritesScreen = ({ navigation }) => {
    const { favourites } = useContext(FavouritesContext);

    return favourites.length ? (
        <SafeArea>
            <RestaurantList
                data={favourites}
                keyExtractor={favourite => favourite.name}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('RestaurantDetail', {
                                    restaurant: item,
                                })
                            }
                        >
                            <Spacer position="bottom" size="large">
                                <RestaurantInfoCard restaurant={item} />
                            </Spacer>
                        </TouchableOpacity>
                    );
                }}
            />
        </SafeArea>
    ) : (
        <NoFavouritesArea>
            <Text center> No favourites yet</Text>
        </NoFavouritesArea>
    );
};

export default FavouritesScreen;
