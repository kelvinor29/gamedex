import { router } from 'expo-router';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

type AuthContextType = {
    user: User | null,
    verifyingUser: boolean,
    logout: () => void,
    signIn: (email: string, password: string) => Promise<void>,
    signUp: (email: string, password: string) => Promise<void>,
}

// Create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

// Provider
export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const [verifyingUser, setVerifyingUser] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setVerifyingUser(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (!verifyingUser) {
            if (user) {
                router.replace('/home/home');
            } else {
                router.replace('/login');
            }
        }
    }, [user, verifyingUser]);

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    const logout = () => signOut(auth);

    return (
        <AuthContext.Provider value={{ user, verifyingUser, logout, signIn, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}
