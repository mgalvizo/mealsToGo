// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
    initializeAuth,
    getReactNativePersistence,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAV9NKFE_1JQsLlEZIlyDKnoXpiOzoBYM0',
    authDomain: 'mealstogo-15801.firebaseapp.com',
    projectId: 'mealstogo-15801',
    storageBucket: 'mealstogo-15801.appspot.com',
    messagingSenderId: '248241651426',
    appId: '1:248241651426:web:97f8fc9977b49f65b9a8bb',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
});

const loginRequest = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

const registerRequest = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

const logoutRequest = async () => await signOut(auth);

const onAuthStateChangedListener = callback =>
    onAuthStateChanged(auth, callback);

export {
    loginRequest,
    registerRequest,
    logoutRequest,
    onAuthStateChangedListener,
};
