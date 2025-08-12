import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Home = () => {
    const { user } = useAuth();
    const { colors } = useTheme();

    return (
        <View className='p-5' style={{ backgroundColor: colors.background, flex: 1 }}>
            <Text variant='displayMedium' className='text-center'>Email: {user?.email}</Text>
        </View>
    )
}

export default Home