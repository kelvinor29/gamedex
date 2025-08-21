import AppInput from '@/components/form/AppInput';
import AppButton from '@/components/ui/AppButton';
import AppGameCard from '@/components/ui/AppGameCard';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteGames } from '@/hooks/useInfiniteGames';
import { IGame } from '@/interfaces/IGame';
import { useThemeStore } from '@/store/useThemeStore';
import { BORDER_RADIUS_LG } from '@/theme/paperTheme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, useWindowDimensions, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const PORTRAIT_ITEM_HEIGHT = 240;
const LANDSCAPE_ITEM_HEIGHT = 220;
const ITEM_GAP = 14;

const Home = () => {

    const { currentTheme } = useThemeStore();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const { width, height } = useWindowDimensions();
    const isPortrait = height > width;

    let numColumns = 1;

    if (isPortrait) {
        if (width >= 900)
            numColumns = 3;
        else if (width >= 600)
            numColumns = 2;
        else
            numColumns = 1;
    }
    else
        numColumns = 3;

    // Handle API request if the user stops typing in the input search
    const debouncedSearch = useDebounce(searchTerm, 500);

    const { data, error, fetchNextPage, hasNextPage,
        isFetchingNextPage, isLoading: isInitialLoading } = useInfiniteGames(debouncedSearch);

    // Map the game list
    const games = data?.pages.flatMap(page => page.results) ?? [];

    // Memo to input search
    const renderInputSearch = useMemo(() => {
        return (
            <View className='py-2 px-1'
                style={{ backgroundColor: currentTheme.background, borderBottomEndRadius: BORDER_RADIUS_LG, borderBottomStartRadius: BORDER_RADIUS_LG }}>
                <AppInput
                    name="search"
                    label="Search for a game..."
                    isLabel={false}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>

        );
    }, [searchTerm, currentTheme]);

    // Callback to render the game card
    const renderGameCard = useCallback(({ item }: { item: IGame }) => (
        <AppGameCard game={item} isPortrait />
    ), []);

    // Memo to the activity indicator when the user are srolling the game list
    const renderLoadingInfiniteSroll = useMemo(() => {
        if (!isFetchingNextPage) return null;
        return (
            <View style={{ paddingVertical: 15 }}>
                <ActivityIndicator size="small" color={currentTheme.primary} />
            </View>
        );
    }, [isFetchingNextPage, currentTheme.primary]);

    const keyExtractor = useCallback((item: IGame) => item.id.toString(), []);

    // Helps FlatList to compute item positions without measuring them, improving performance
    const getItemLayout = useCallback(
        (_: ArrayLike<IGame> | null | undefined, index: number) => {
            // Sets the right height of the item based on its orientation
            const itemHeight = isPortrait ? PORTRAIT_ITEM_HEIGHT : LANDSCAPE_ITEM_HEIGHT;
            const totalItemHeight = itemHeight + ITEM_GAP;

            return {
                length: totalItemHeight,
                offset: totalItemHeight * index,
                index,
            };
        },
        [isPortrait]
    );

    // Handle whether there is a next page to render in an infinity query
    const handleLoadMore = () => {
        if (hasNextPage && !isFetchingNextPage)
            fetchNextPage();
    };

    // Callback if there is an error or the game list is empty
    const renderEmptyGameList = useCallback(() => {
        if (isInitialLoading) {
            return (
                <View className='flex-1 justify-center items-center' >
                    <ActivityIndicator size="large" color={currentTheme.primary} />
                    <Text className='mt-4'>Loading Games...</Text>
                </View>
            );
        }

        if (!error) {
            return (
                <View className='flex-1 justify-center items-center gap-6'>
                    <Text variant='displayMedium' style={{ color: currentTheme.primary }}>
                        Could not load games.
                    </Text>
                    <AppButton mode='contained' onPress={fetchNextPage}>Retry</AppButton>
                </View>
            );
        }

        return (
            <View className='flex-1 justify-center items-center gap-6'>
                <Text variant='displayMedium' style={{ color: currentTheme.primary }}>
                    No games found.
                </Text>
                <AppButton mode='contained' onPress={fetchNextPage}>Retry</AppButton>
            </View>
        );
    }, [isInitialLoading, currentTheme.primary, error, fetchNextPage]);

    return (
        <SafeAreaView className='flex-1' style={{ backgroundColor: currentTheme.background }}>

            <FlatList
                key={`${isPortrait}-${numColumns}`}
                numColumns={numColumns}
                columnWrapperStyle={numColumns > 1 ? { gap: ITEM_GAP } : undefined}

                data={games}
                renderItem={renderGameCard}
                keyExtractor={keyExtractor}

                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={4}
                removeClippedSubviews
                updateCellsBatchingPeriod={60}
                getItemLayout={(getItemLayout)}

                onEndReached={handleLoadMore} // Infinity query
                onEndReachedThreshold={0.5}

                contentContainerClassName='p-3'
                contentContainerStyle={{
                    gap: ITEM_GAP, paddingBottom: 84, flexGrow: 1
                }}
                ListHeaderComponent={renderInputSearch}
                ListFooterComponent={renderLoadingInfiniteSroll}
                ListEmptyComponent={renderEmptyGameList}

                // stickyHeaderIndices={[0]}
                stickyHeaderIndices={isPortrait ? [0] : undefined}
            />

            {/* Gradient */}
            <LinearGradient
                colors={[currentTheme.grandientOne, currentTheme.grandientTwo, 'transparent']}
                locations={[0, 0.75, 1]}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="h-24 w-full absolute bottom-0" />

        </SafeAreaView>
    );
};

export default Home;
