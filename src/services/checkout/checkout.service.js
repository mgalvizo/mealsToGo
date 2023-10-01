import createStripe from 'stripe-client';

const stripe = createStripe(
    'pk_test_51NwVF8As2AmfghRXreX6usj9ltI75LHy3VEr76SNePemlGeOW6sZNVCuLyh4E7FWlBThKqoDoCSrtIItkH4GbS9z00Mfh9lqpa',
);

const cardTokenRequest = card => stripe.createToken({ card });

export { cardTokenRequest };
