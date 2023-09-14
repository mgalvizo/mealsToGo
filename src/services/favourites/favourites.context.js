import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useReducer, useContext } from 'react';

import { AuthenticationContext } from '../../services/authentication/authentication.context';

const initialState = {
    favourites: [],
};

const initialValue = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
};

const favouritesReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET':
            return { ...state, favourites: payload };
        case 'ADD':
            return { ...state, favourites: [...state.favourites, payload] };
        case 'REMOVE':
            return {
                ...state,
                favourites: state.favourites.filter(
                    restaurant => restaurant.placeId !== payload.placeId,
                ),
            };
        default:
            return state;
    }
};

const FavouritesContext = createContext(initialValue);

const FavouritesProvider = ({ children }) => {
    const { user } = useContext(AuthenticationContext);

    const [state, dispatch] = useReducer(favouritesReducer, initialState);

    // Value is the array of favourites
    const saveFavourites = async (value, uid) => {
        try {
            // Convert to JSON string
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
        } catch (err) {
            console.log('error storing', err);
        }
    };

    const loadFavourites = async uid => {
        try {
            const value = await AsyncStorage.getItem(`@favourites-${uid}`);
            if (value !== null) {
                // Convert to JavaScript object
                dispatch({ type: 'SET', payload: JSON.parse(value) });
            }
        } catch (err) {
            console.log('error loading', err);
        }
    };

    const add = restaurant => {
        dispatch({ type: 'ADD', payload: restaurant });
    };

    const remove = restaurant => {
        dispatch({ type: 'REMOVE', payload: restaurant });
    };

    // Load the favourites on initial render
    useEffect(() => {
        if (user && user.uid) {
            loadFavourites(user.uid);
        }
    }, [user]);

    // Everytime favourites changes, the saveFavourites function will run
    useEffect(() => {
        if (user && user.uid && state.favourites.length) {
            saveFavourites(state.favourites, user.uid);
        }
    }, [state.favourites, user]);

    const contextValue = {
        favourites: state.favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
    };

    return (
        <FavouritesContext.Provider value={contextValue}>
            {children}
        </FavouritesContext.Provider>
    );
};

export { FavouritesContext };

export default FavouritesProvider;
