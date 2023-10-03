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
        case 'LOAD_CART':
            return {
                ...state,
                restaurant: payload.rst,
                cart: [...payload.crt],
            };
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

    const saveCart = async (rst, crt, uid) => {
        try {
            const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
            await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
        } catch (err) {
            console.log('Error storing', err);
        }
    };

    const loadCart = async uid => {
        try {
            const value = await AsyncStorage.getItem(`@cart-${uid}`);

            if (value !== null) {
                const { restaurant: rst, cart: crt } = JSON.parse(value);
                dispatch({ type: 'LOAD_CART', payload: { rst, crt } });
            }
        } catch (err) {
            console.log('Error loading', err);
        }
    };

    useEffect(() => {
        if (user && user.uid) {
            loadCart(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (user && user.uid) {
            saveCart(restaurant, cart, user.uid);
        }
    }, [restaurant, cart, user]);

    useEffect(() => {
        if (!cart.length) {
            dispatch({ type: 'CLEAR_SUM' });
        }

        const sum = cart.reduce((acc, { price }) => {
            return (acc += price);
        }, 0);

        dispatch({ type: 'SUM_CART', payload: sum });
    }, [cart, dispatch]);

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
