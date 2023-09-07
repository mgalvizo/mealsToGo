import React, { useReducer, createContext, useEffect, useMemo } from 'react';

import {
    restaurantsRequest,
    restaurantsTransform,
} from './restaurants.service';

const initialState = {
    restaurants: [],
    isLoading: false,
    error: null,
};

const initialValue = {
    restaurants: [],
    isLoading: false,
    error: null,
};

const restaurantReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'FETCH_START':
            return { ...state, isLoading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                restaurants: [...state.restaurants, ...payload],
                isLoading: false,
                error: null,
            };
        case 'FETCH_FAILED':
            return { ...state, error: payload, isLoading: false };
        default:
            return state;
    }
};

const RestaurantContext = createContext(initialValue);

const RestaurantProvider = ({ children }) => {
    const [state, dispatch] = useReducer(restaurantReducer, initialState);

    const retrieveRestaurants = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            setTimeout(async () => {
                const rawResults = await restaurantsRequest();
                const transformedResults = restaurantsTransform(rawResults);

                dispatch({
                    type: 'FETCH_SUCCESS',
                    payload: transformedResults,
                });
            }, 2000);
        } catch (err) {
            dispatch({ type: 'FETCH_FAILED', payload: err });
        }
    };

    useEffect(() => {
        retrieveRestaurants();
    }, []);

    const contextValue = {
        restaurants: state.restaurants,
        isLoading: state.isLoading,
        error: state.error,
    };

    return (
        <RestaurantContext.Provider value={contextValue}>
            {children}
        </RestaurantContext.Provider>
    );
};

export { RestaurantContext };

export default RestaurantProvider;
