import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

import Spacer from '../../../components/Spacer/Spacer.component';
import Text from '../../../components/Typography/Text.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { CartContext } from '../../../services/cart/cart.context';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard.component';
import { CartIconContainer, CartIcon } from '../components/Checkout.styles';
import CreditCard from '../components/CreditCard.component';

const CheckoutScreen = () => {
    const { cart, restaurant, sum } = useContext(CartContext);

    if (!cart.length || !restaurant) {
        return (
            <SafeArea>
                <CartIconContainer>
                    <CartIcon icon="cart-off" />
                    <Text>Your cart is empty</Text>
                </CartIconContainer>
            </SafeArea>
        );
    }

    const renderedCart = cart.map(({ item, price }) => {
        return <List.Item title={`${item} - ${price / 100}`} />;
    });

    return (
        <SafeArea>
            <RestaurantInfoCard restaurant={restaurant} />
            <ScrollView>
                <Spacer position="left" size="medium">
                    <Spacer position="top" size="large">
                        <Text>Your Order</Text>
                    </Spacer>
                    <List.Section>{renderedCart}</List.Section>
                    <Text>Total: {sum / 100}</Text>
                </Spacer>
                <CreditCard />
            </ScrollView>
        </SafeArea>
    );
};

export default CheckoutScreen;
