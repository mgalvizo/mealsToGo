import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useReducer, useContext } from 'react';

import { AuthenticationContext } from '../authentication/authentication.context';

const initialState = {
    restaurant: null,
    cart: [],
    sum: 0,
};

const initialValue = {
    addToCart: () => {},
    clearCart: () => {},
    restaurant: null,
    cart: [],
    sum: 0,
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'CLEAR_SUM':
            return { ...state, sum: 0 };
        case 'SUM_CART':
            return { ...state, sum: payload };
        case 'SET_CART':
            return { ...state, restaurant: payload.rst, cart: [payload.item] };
        case 'ADD_CART':
            return { ...state, cart: [...state.cart, payload] };
        case 'CLEAR_CART':
            return { ...state, cart: [], restaurant: null, sum: 0 };
        default:
            return state;
    }
};

const CartContext = createContext(initialValue);

const CartProvider = ({ children }) => {
    const { user } = useContext(AuthenticationContext);
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const { cart, restaurant, sum } = state;

    const addToCart = (item, rst) => {
        if (!restaurant || restaurant.placeId !== rst.placeId) {
            dispatch({ type: 'SET_CART', payload: { rst, item } });
        } else {
            dispatch({ type: 'ADD_CART', payload: item });
        }
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    useEffect(() => {
        if (!cart.length) {
            dispatch({ type: 'CLEAR_SUM' });
        }

        const sum = cart.reduce((acc, { price }) => {
            return (acc += price);
        }, 0);

        dispatch({ type: 'SUM_CART', payload: sum });
    }, [cart, dispatch]);

    const contextValue = {
        addToCart,
        clearCart,
        restaurant,
        cart,
        sum,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext };

export default CartProvider;
