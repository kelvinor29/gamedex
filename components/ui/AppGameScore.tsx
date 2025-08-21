import { useThemeStore } from '@/store/useThemeStore';
import { BORDER_RADIUS_LG } from '@/theme/paperTheme';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type GameScoreProps = {
    correct: number;
    incorrect: number;
    attemptsLeft: number;
    maxAttemps: number;
}

const AppGameScore = ({ correct, incorrect, attemptsLeft, maxAttemps }: GameScoreProps) => {
    const { currentTheme } = useThemeStore();

    return (
        <>
            {/* Start Game Score Info */}
            <View className='flex flex-row gap-6 justify-around items-center'>

                {/* Start UserScore */}
                <View className='px-7 py-2 flex flex-row justify-around items-center gap-10'
                    style={{
                        backgroundColor: currentTheme.accent,
                        borderRadius: BORDER_RADIUS_LG
                    }}>

                    <View className='flex flex-col items-center gap-1'>
                        <Text variant='labelLarge'>Corrects</Text>
                        <Text variant="bodyMedium" style={{ fontFamily: "Inter_700Bold" }}>{correct}</Text>
                    </View>

                    <View className='flex flex-col items-center gap-1'>
                        <Text variant='labelLarge'>Incorrects</Text>
                        <Text variant="bodyMedium" style={{ fontFamily: "Inter_700Bold" }}>{incorrect}</Text>
                    </View>

                </View>
                {/* End UserScore */}

                {/* Start Attempts Left */}
                <View className='px-7 py-2 flex flex-row justify-around items-center gap-10'
                    style={{
                        backgroundColor: currentTheme.red_transp_03,
                        borderRadius: BORDER_RADIUS_LG,
                        borderColor: currentTheme.error,
                        borderWidth: 1
                    }}>
                    <View className='flex flex-col items-center gap-1'>
                        <Text variant='labelLarge' style={{ color: currentTheme.red_light }}>Attempts left</Text>
                        <Text variant="bodyMedium" style={{ fontFamily: "Inter_700Bold", color: currentTheme.red_light }}>❤ {attemptsLeft}/{maxAttemps}</Text>
                    </View>
                </View>
                {/* End Attempts Left */}

            </View>
            {/* End Game Score Info */}
        </>
    )
}

export default AppGameScore