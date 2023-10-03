import {
    Avatar,
    TextInput,
    ActivityIndicator,
    Button,
} from 'react-native-paper';
import styled from 'styled-components/native';

import { COLORS } from '../../../infrastructure/theme/colors';

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

const PaymentProcessing = styled(ActivityIndicator).attrs({
    size: 128,
    animating: true,
    color: COLORS.brand.primary,
})`
    position: absolute;
    top: 50%;
    left: 35%;
    z-index: 999;
`;

const NameInput = styled(TextInput)`
    margin: ${({ theme }) => theme.SPACE[3]};
`;

const PayButton = styled(Button).attrs({
    color: COLORS.brand.primary,
})`
    width: 80%;
    align-self: center;
    padding: ${({ theme }) => theme.SPACE[2]};
`;

const ClearButton = styled(Button).attrs({
    color: COLORS.text.error,
})`
    width: 80%;
    align-self: center;
    padding: ${({ theme }) => theme.SPACE[2]};
`;

export {
    CartIconContainer,
    CartIcon,
    PaymentProcessing,
    NameInput,
    PayButton,
    ClearButton,
};
