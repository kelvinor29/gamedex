import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';

const Home = () => {
    const { user, logout } = useAuth();

    return (
        <View>
            <Text>Welcome, {user?.email}</Text>
            <Button onPress={logout}>Logout</Button>
        </View>
    )
}

export default Home