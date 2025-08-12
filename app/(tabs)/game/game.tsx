import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Game = () => {
    const { colors } = useTheme();

    return (
        <View className='p-5' style={{ backgroundColor: colors.background, flex: 1 }}>
            <Text variant='displayMedium' className='text-center'>Game</Text>
        </View>
    )
}

export default Game