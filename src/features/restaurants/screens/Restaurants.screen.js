import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import styled from 'styled-components/native';

import FadeInView from '../../../components/Animations/Fade.animation';
import FavouritesBar from '../../../components/Favourites/FavouritesBar.component';
import Spacer from '../../../components/Spacer/Spacer.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { RestaurantContext } from '../../../services/restaurants/restaurants.context';
import RestaurantInfoCard from '../components/RestaurantInfoCard.component';
import { RestaurantList } from '../components/RestaurantList.styles';
import Search from '../components/Search.component';

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

// Access to navigation prop since component is a screen in the navigator
const Restaurants = ({ navigation }) => {
    const { restaurants, isLoading } = useContext(RestaurantContext);
    const { favourites } = useContext(FavouritesContext);
    const [isToggled, setIsToggled] = useState(false);

    return (
        <SafeArea>
            {isLoading && (
                <LoadingContainer>
                    <Loading animating />
                </LoadingContainer>
            )}
            <Search
                isFavouritesToggled={isToggled}
                onFavouritesToggle={() => setIsToggled(!isToggled)}
            />
            {isToggled && (
                <FavouritesBar
                    favourites={favourites}
                    onNavigate={navigation.navigate}
                />
            )}
            <RestaurantList
                data={restaurants}
                keyExtractor={restaurant => restaurant.name}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            // Pass the whole object as a parameter
                            onPress={() =>
                                navigation.navigate('RestaurantDetail', {
                                    restaurant: item,
                                })
                            }
                        >
                            <Spacer position="bottom" size="large">
                                <FadeInView>
                                    <RestaurantInfoCard restaurant={item} />
                                </FadeInView>
                            </Spacer>
                        </TouchableOpacity>
                    );
                }}
            />
        </SafeArea>
    );
};

export default Restaurants;
