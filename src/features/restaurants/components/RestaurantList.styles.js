import styled from 'styled-components/native';

// Gets access to the attributes of the FlatList
// These styles will be applied to the scroll view content container which wraps all of the child views
const RestaurantList = styled.FlatList.attrs({
    contentContainerStyle: {
        padding: 16,
    },
})``;

export { RestaurantList };
