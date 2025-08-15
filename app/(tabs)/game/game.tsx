import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Game = () => {
    const { colors } = useTheme();

    return (
        <View className='p-5 flex-1' style={{ backgroundColor: colors.background }}>
            <Text variant='displayMedium' className='text-center'>Game</Text>
        </View>
    )
}

export default Game