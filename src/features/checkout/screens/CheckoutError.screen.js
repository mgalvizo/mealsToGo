import React from 'react';

import Text from '../../../components/Typography/Text.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { COLORS } from '../../../infrastructure/theme/colors';
import { CartIconContainer, CartIcon } from '../components/Checkout.styles';

const CheckoutErrorScreen = ({ route }) => {
    const { error = '' } = route.params;

    return (
        <SafeArea>
            <CartIconContainer>
                <CartIcon icon="close" bg={COLORS.ui.error} />
                <Text variant="label">{error}</Text>
            </CartIconContainer>
        </SafeArea>
    );
};

export default CheckoutErrorScreen;
