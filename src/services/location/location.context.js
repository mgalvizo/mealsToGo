import React, { createContext, useEffect, useReducer } from 'react';

import { locationRequest, locationTransform } from './location.service';

const initialState = {
    isLoading: false,
    error: null,
    location: null,
    search: () => {},
    keyword: 'San Francisco',
};

const initialValue = {
    isLoading: false,
    error: null,
    location: null,
    search: () => {},
    keyword: '',
};

const locationReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'LOCATION_START':
            return { ...state, isLoading: true, keyword: payload };
        case 'LOCATION_SUCCESS':
            return {
                ...state,
                isLoading: false,
                location: payload,
                error: null,
            };
        case 'LOCATION_ERROR':
            return { ...state, isLoading: false, error: payload };
        default:
            return state;
    }
};

const LocationContext = createContext(initialValue);

const LocationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(locationReducer, initialState);

    const { keyword } = state;

    // Run when searching for a location
    const onSearch = searchKeyword => {
        dispatch({ type: 'LOCATION_START', payload: searchKeyword });
    };

    const retrieveLocation = async () => {
        if (!keyword.length) {
            return;
        }
        try {
            const rawResults = await locationRequest(keyword.toLowerCase());
            const transformedResults = locationTransform(rawResults);

            dispatch({
                type: 'LOCATION_SUCCESS',
                payload: transformedResults,
            });
        } catch (err) {
            dispatch({ type: 'LOCATION_ERROR', payload: err });
        }
    };

    useEffect(() => {
        retrieveLocation();
    }, [keyword]);

    const contextValue = {
        isLoading: state.isLoading,
        error: state.error,
        location: state.location,
        search: onSearch,
        keyword: state.keyword,
    };

    return (
        <LocationContext.Provider value={contextValue}>
            {children}
        </LocationContext.Provider>
    );
};

export { LocationContext };

export default LocationProvider;
