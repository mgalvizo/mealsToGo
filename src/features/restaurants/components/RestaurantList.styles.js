import { Button } from 'react-native-paper';
import styled from 'styled-components/native';

import { COLORS } from '../../../infrastructure/theme/colors';

// Gets access to the attributes of the FlatList
// These styles will be applied to the scroll view content container which wraps all of the child views
const RestaurantList = styled.FlatList.attrs({
    contentContainerStyle: {
        padding: 16,
    },
})``;

const OrderButton = styled(Button).attrs({
    color: COLORS.brand.primary,
})`
    padding: ${({ theme }) => theme.SPACE[2]};
    width: 80%;
    align-self: center;
`;

export { RestaurantList, OrderButton };
