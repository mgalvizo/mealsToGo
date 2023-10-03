import createStripe from 'stripe-client';

import { host } from '../../utils/env';

const stripe = createStripe(
    'pk_test_51NwVF8As2AmfghRXreX6usj9ltI75LHy3VEr76SNePemlGeOW6sZNVCuLyh4E7FWlBThKqoDoCSrtIItkH4GbS9z00Mfh9lqpa',
);

const cardTokenRequest = card => stripe.createToken({ card });

const payRequest = async (token, amount, name) => {
    try {
        const res = await fetch(`${host}/pay`, {
            body: JSON.stringify({
                token,
                name,
                amount,
            }),
            method: 'POST',
        });

        if (res.status > 200) {
            throw new Error(
                'Something went wrong when processing your payment',
            );
        }

        return res.json();
    } catch (err) {
        console.log(err);
    }
};

export { cardTokenRequest, payRequest };
