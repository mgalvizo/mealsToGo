import React, { createContext, useReducer, useEffect } from 'react';

import {
    loginRequest,
    registerRequest,
    logoutRequest,
    onAuthStateChangedListener,
} from './authentication.service';

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
    onRegister: () => {},
    onLogout: () => {},
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
        case 'LOGOUT_SUCCESS':
            return { ...state, isLoading: false, error: null, user: null };
        case 'IS_AUTHENTICATED':
            return { ...state, isLoading: false, user: payload };
        case 'NOT_AUTHENTICATED':
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

const AuthenticationContext = createContext(initialValue);

const AuthenticationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authenticationReducer, initialState);

    const { user, isLoading, error } = state;

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            if (user) {
                dispatch({ type: 'IS_AUTHENTICATED', payload: user });
            } else {
                dispatch({ type: 'NOT_AUTHENTICATED' });
            }
        });

        return unsubscribe;
    }, []);

    const onLogin = async (email, password) => {
        dispatch({ type: 'AUTH_START' });

        try {
            const user = await loginRequest(email, password);

            dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } catch (err) {
            dispatch({ type: 'AUTH_FAILED', payload: err.toString() });
        }
    };

    const onRegister = async (email, password, confirmPassword) => {
        dispatch({ type: 'AUTH_START' });

        try {
            if (password !== confirmPassword) {
                throw new Error('Error: Passwords do not match');
            }

            const user = await registerRequest(email, password);

            dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } catch (err) {
            dispatch({ type: 'AUTH_FAILED', payload: err.toString() });
        }
    };

    const onLogout = async () => {
        dispatch({ type: 'AUTH_START' });

        try {
            await logoutRequest();

            dispatch({ type: 'LOGOUT_SUCCESS' });
        } catch (err) {
            dispatch({ type: 'AUTH_FAILED', payload: err.toString() });
        }
    };

    const contextValue = {
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
    };

    return (
        <AuthenticationContext.Provider value={contextValue}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export { AuthenticationContext };

export default AuthenticationProvider;
