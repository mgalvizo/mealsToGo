import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { List, Divider } from 'react-native-paper';

import Spacer from '../../../components/Spacer/Spacer.component';
import Text from '../../../components/Typography/Text.component';
import SafeArea from '../../../components/Utils/SafeArea.component';
import { CartContext } from '../../../services/cart/cart.context';
import { payRequest } from '../../../services/checkout/checkout.service';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard.component';
import {
    CartIconContainer,
    CartIcon,
    NameInput,
    PayButton,
    ClearButton,
    PaymentProcessing,
} from '../components/Checkout.styles';
import CreditCard from '../components/CreditCard.component';

const CheckoutScreen = ({ navigation }) => {
    const { cart, restaurant, sum, clearCart } = useContext(CartContext);
    const [name, setName] = useState('');
    const [card, setCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onPay = async () => {
        setIsLoading(true);

        try {
            if (!card || !card.id) {
                setIsLoading(false);
                navigation.navigate('CheckoutError', {
                    error: 'Please fill a valid credit card',
                });
            }

            const result = await payRequest(card.id, sum, name);

            setIsLoading(false);
            clearCart();
            navigation.navigate('CheckoutSuccess');
        } catch (err) {
            setIsLoading(false);
            navigation.navigate('CheckoutError', {
                error: err,
            });
        }
    };

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

    const renderedCart = cart.map(({ item, price }, i) => {
        return (
            <List.Item key={`item-${i}`} title={`${item} - ${price / 100}`} />
        );
    });

    return (
        <SafeArea>
            <RestaurantInfoCard restaurant={restaurant} />
            {isLoading && <PaymentProcessing />}
            <ScrollView>
                <Spacer position="left" size="medium">
                    <Spacer position="top" size="large">
                        <Text>Your Order</Text>
                    </Spacer>
                    <List.Section>{renderedCart}</List.Section>
                    <Text>Total: {sum / 100}</Text>
                </Spacer>
                <Spacer position="top" size="large" />
                <Divider />
                <NameInput
                    label="Name"
                    value={name}
                    onChangeText={enteredName => setName(enteredName)}
                />
                <Spacer position="top" size="large">
                    {name.length > 0 && (
                        <CreditCard
                            name={name}
                            onSuccess={setCard}
                            onError={() =>
                                navigation.navigate('CheckoutError', {
                                    error: 'Something went wrong when processing your credit card',
                                })
                            }
                        />
                    )}
                </Spacer>
                <Spacer position="top" size="xxl" />
                <PayButton
                    disabled={isLoading}
                    icon="currency-usd"
                    mode="contained"
                    onPress={onPay}
                >
                    Pay
                </PayButton>
                <Spacer position="top" size="large">
                    <ClearButton
                        disabled={isLoading}
                        icon="cart-off"
                        mode="contained"
                        onPress={clearCart}
                    >
                        Clear Cart
                    </ClearButton>
                </Spacer>
            </ScrollView>
        </SafeArea>
    );
};

export default CheckoutScreen;
