import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdYBPhmbli1Q35p187oEY4vP-1F4OcnHM",
    authDomain: "gamedex-f515d.firebaseapp.com",
    projectId: "gamedex-f515d",
    storageBucket: "gamedex-f515d.firebasestorage.app",
    messagingSenderId: "947420099940",
    appId: "1:947420099940:web:7956c71826b77ef2e4f671"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
