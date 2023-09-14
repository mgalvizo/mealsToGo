import React, { createContext, useReducer } from 'react';

import { loginRequest } from './authentication.service';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    user: null,
};

const initialValue = {
    isAuthenticated: false,
    isLoading: false,
    error: null,
    user: null,
    onLogin: () => {},
};

const authenticationReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'AUTH_START':
            return { ...state, isLoading: true };
        case 'AUTH_SUCCESS':
            return { ...state, isLoading: false, user: payload };
        case 'AUTH_FAILED':
            return { ...state, isLoading: false, error: payload };
        default:
            return state;
    }
};

const AuthenticationContext = createContext(initialValue);

const AuthenticationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authenticationReducer, initialState);

    const { isAuthenticated, user, isLoading, error } = state;

    const onLogin = async (email, password) => {
        dispatch({ type: 'AUTH_START' });

        try {
            const user = await loginRequest(email, password);

            dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } catch (err) {
            dispatch({ type: 'AUTH_FAILED', payload: err.toString() });
        }
    };

    const contextValue = {
        isAuthenticated,
        user,
        isLoading,
        error,
        onLogin,
    };

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export { AuthenticationContext };

export default AuthenticationProvider;
