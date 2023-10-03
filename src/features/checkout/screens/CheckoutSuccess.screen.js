import React from 'react';

import Text from '../../../components/Typography/Text.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { CartIconContainer, CartIcon } from '../components/Checkout.styles';

const CheckoutSuccessScreen = () => {
    return (
        <SafeArea>
            <CartIconContainer>
                <CartIcon icon="check-bold" />
                <Text variant="label">Success!</Text>
            </CartIconContainer>
        </SafeArea>
    );
};

export default CheckoutSuccessScreen;
