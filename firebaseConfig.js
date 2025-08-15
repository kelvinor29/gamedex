import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_AUTH_KEY,
    authDomain: "gamedex-d9492.firebaseapp.com",
    projectId: "gamedex-d9492",
    storageBucket: "gamedex-d9492.firebasestorage.app",
    messagingSenderId: "778520582562",
    appId: "1:778520582562:web:e9576e1532a30579487afb"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
