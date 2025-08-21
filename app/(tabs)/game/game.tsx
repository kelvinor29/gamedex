import AppButton from '@/components/ui/AppButton';
import AppGameCard from '@/components/ui/AppGameCard';
import AppGameOptions from '@/components/ui/AppGameOptions';
import AppGameScore from '@/components/ui/AppGameScore';
import useGameLogic from '@/hooks/useGameLogic';
import { useHeaderGameStore } from '@/store/useHeaderGameStore';
import { useThemeStore } from '@/store/useThemeStore';
import { BORDER_RADIUS_LG } from '@/theme/paperTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ActivityIndicator, Button, Dialog, Portal, Text } from 'react-native-paper';

const Game = () => {

    const { currentTheme } = useThemeStore();
    const { setRestartGame } = useHeaderGameStore();
    const navigation = useNavigation();

    const {
        isLoading,
        isError,
        selectedGameId,
        correctAnswers,
        incorrectAnswers,
        attemptsLeft,
        currentGame,
        gameOptions,
        isGameOver,
        ALLOWED_ATTEMPTS,
        verifyAnswer,
        restartGame } = useGameLogic();


    useEffect(() => {
        navigation.addListener('focus', () => {
            setRestartGame(restartGame);
        });
    }, [navigation, setRestartGame, restartGame]);

    const isGameReady = currentGame && gameOptions.length > 0;

    return (
        <SafeAreaView className='flex-1 justify-center' style={{ backgroundColor: currentTheme.background }}>

            {/* Loader */}
            {isLoading && !currentGame && (
                <View className='flex-1 justify-center items-center' style={{ backgroundColor: currentTheme.background }}>
                    <ActivityIndicator size="large" color={currentTheme.primary} />
                    <Text className='mt-4'>Loading Games...</Text>
                </View>
            )}
            {/* End Loader */}

            {/* Error */}
            {isError && (
                <View className='flex-1 justify-center items-center gap-6' style={{ backgroundColor: currentTheme.background }}>
                    <Text variant='displayMedium' style={{ color: currentTheme.primary }}>
                        Could not load games.
                    </Text>
                    <AppButton mode='contained' onPress={restartGame}>Retry</AppButton>
                </View>
            )}

            {isGameReady && (
                <View className='p-4 gap-6'>
                    <AppGameScore
                        correct={correctAnswers}
                        incorrect={incorrectAnswers}
                        attemptsLeft={attemptsLeft}
                        maxAttemps={ALLOWED_ATTEMPTS}
                    />

                    {/* Game Card */}
                    {!isLoading && currentGame && (
                        <AppGameCard game={{ ...currentGame, name: '- - - - - - - - - - - - ' }} />
                    )}
                    {/* End Game Card */}

                    {/* Start game options */}
                    {!isLoading && gameOptions.length > 0 && (
                        <AppGameOptions
                            gameOptions={gameOptions}
                            currentGame={currentGame}
                            selectedGameId={selectedGameId}
                            verifyAnswer={verifyAnswer}
                        />
                    )}
                    {/* End game options */}
                </View>
            )}

            <Portal>
                {isGameOver && (
                    <Dialog visible={isGameOver} onDismiss={restartGame}
                        theme={{ roundness: 2 }}
                        style={{ backgroundColor: currentTheme.background }}>

                        <Dialog.Title style={{ textAlign: 'center' }}>Game Over</Dialog.Title>
                        <Dialog.Content>

                            {/* Start UserScore */}
                            <View className='px-7 py-2 flex flex-row justify-around items-center gap-10'
                                style={{
                                    backgroundColor: currentTheme.accent,
                                    borderRadius: BORDER_RADIUS_LG
                                }}>

                                <View className='flex flex-col items-center gap-1'>
                                    <Text variant='labelLarge'>Corrects</Text>
                                    <Text variant="bodyMedium" style={{ fontFamily: "Inter_700Bold" }}>{correctAnswers}</Text>
                                </View>

                                <View className='flex flex-col items-center gap-1'>
                                    <Text variant='labelLarge'>Incorrects</Text>
                                    <Text variant="bodyMedium" style={{ fontFamily: "Inter_700Bold" }}>{incorrectAnswers}</Text>
                                </View>

                            </View>
                            {/* End UserScore */}

                        </Dialog.Content>

                        <Dialog.Actions style={{ justifyContent: 'center' }}>
                            <Button
                                style={{ borderRadius: BORDER_RADIUS_LG, borderColor: currentTheme.primary, borderWidth: 1 }}
                                contentStyle={{ paddingVertical: 2, paddingHorizontal: 40 }}
                                labelStyle={{ fontFamily: "Inter_700Bold", fontSize: 16 }}
                                onPress={restartGame}>Play again</Button>
                        </Dialog.Actions>
                    </Dialog>
                )}
            </Portal>

            {/* Gradient */}
            <LinearGradient
                colors={[currentTheme.grandientOne, currentTheme.grandientTwo, 'transparent']}
                locations={[0, 0.75, 1]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="h-24 w-full absolute bottom-0" />
        </SafeAreaView>
    )
}

export default Game