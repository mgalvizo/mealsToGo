import { Avatar } from 'react-native-paper';
import styled from 'styled-components/native';

const CartIconContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const CartIcon = styled(Avatar.Icon).attrs({
    size: 128,
})`
    background-color: ${({ bg, theme }) => bg || theme.COLORS.brand.primary};
`;

export { CartIconContainer, CartIcon };
