import React, { useReducer, createContext, useEffect, useContext } from 'react';

import {
    restaurantsRequest,
    restaurantsTransform,
} from './restaurants.service';
import { LocationContext } from '../location/location.context';

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
            return { ...state, isLoading: true, restaurants: [] };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                restaurants: [...payload],
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
    const { location } = useContext(LocationContext);

    const retrieveRestaurants = async location => {
        dispatch({ type: 'FETCH_START' });
        try {
            const rawResults = await restaurantsRequest(location);
            const transformedResults = restaurantsTransform(rawResults);

            dispatch({
                type: 'FETCH_SUCCESS',
                payload: transformedResults,
            });
        } catch (err) {
            dispatch({ type: 'FETCH_FAILED', payload: err });
        }
    };

    useEffect(() => {
        if (location) {
            const locationString = `${location.lat},${location.lng}`;
            retrieveRestaurants(locationString);
        }
    }, [location]);

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
