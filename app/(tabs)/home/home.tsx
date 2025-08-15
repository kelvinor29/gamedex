import AppGameCard from '@/components/ui/AppGameCard';
import { IGame, useGameStore } from '@/store/useGameStore';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

const ITEM_HEIGHT = 240;
const ITEM_GAP = 14;
const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + ITEM_GAP;


const Home = () => {
    const { colors } = useTheme();
    const { games, loading, error, fetchGames } = useGameStore();

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    const renderGameCard = useCallback(
        ({ item }: { item: IGame; }) => {
            return (
                <AppGameCard game={item} />
            );
        },
        []
    );

    const keyExtractor = useCallback((item: IGame) => item.id.toString(), []);

    // Helps FlatList to compute item positions without measuring them, improving performance
    const getItemLayout = useCallback(
        (_: ArrayLike<IGame> | null | undefined, index: number) => ({
            length: TOTAL_ITEM_HEIGHT,
            offset: TOTAL_ITEM_HEIGHT * index,
            index,
        }), []
    );

    const emptyList = !loading && games.length === 0;

    return (
        <SafeAreaView
            className='flex-1'
            style={{ backgroundColor: colors.background }}>

            {loading && (
                <View className='flex-1 justify-center items-center' >
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text className='mt-4'>Loading Games...</Text>
                </View>)
            }

            {error && games.length === 0 && (
                <View className='flex-1 justify-center items-center'>
                    <Text variant='displayMedium' className='text-center' style={{ color: colors.primary }}>Error</Text>
                    {/* <Text variant='displayMedium' className='text-center' style={{ color: colors.primary }}>Error: {error}</Text> */}
                    <Text variant='bodyMedium' className='mt-2 text-center'>Could not load games. Try again later.</Text>
                </View>
            )}

            {!loading && games.length > 0 && (
                <>
                    <FlatList
                        data={games}
                        renderItem={renderGameCard}
                        keyExtractor={keyExtractor}

                        initialNumToRender={5}
                        maxToRenderPerBatch={5}
                        windowSize={3}
                        removeClippedSubviews
                        updateCellsBatchingPeriod={50}
                        getItemLayout={(getItemLayout)}

                        contentContainerClassName='p-4'
                        contentContainerStyle={{
                            gap: ITEM_GAP, paddingBottom: 84
                        }}
                        ListEmptyComponent={() => (
                            emptyList && (
                                <View className='flex-1 justify-center items-center' >
                                    <Text variant='displayMedium' className='mt-4'>No games found.</Text>
                                </View>)
                        )}

                        ListHeaderComponent={() => (
                            !emptyList && (
                                <View className='flex-1 justify-center items-center' >
                                    <Text variant='displayMedium' className='mt-4'>Games</Text>
                                </View>)
                        )}
                    />

                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)', 'transparent']}
                        locations={[0, 0.75, 1]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        className="h-24 w-full absolute bottom-0" />
                </>

            )}

        </SafeAreaView>
    );
};

export default Home;
