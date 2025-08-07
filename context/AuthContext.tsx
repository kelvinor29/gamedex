import { router } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

type AuthContextType = {
    user: User | null,
    loading: boolean,
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: () => { }
})

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {

            setUser(firebaseUser);
            setLoading(false);

            if(firebaseUser) router.replace('/home/home');
            else router.replace('/login')
        });

        return unsubscribe;
    }, []);

    const logout = () => {
        auth.signOut();
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}