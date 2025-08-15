import PlatformIcons from '@/components/ui/AppPlatformIcons';
import { IGame } from '@/store/useGameStore';
import { colors as colorsApp } from '@/theme/colors';
import { BORDER_RADIUS_LG } from '@/theme/paperTheme';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface AppGameCardProps {
    game: IGame;
    styles?: StyleProp<ViewStyle>;
}

const AppGameCard = ({ game, styles }: AppGameCardProps) => {
    const { colors } = useTheme();

    // Avoid create strings/arrays per render
    const genresTextMemo = useMemo(() =>
        game.genres.slice(0, 2).join(' • '),
        [game.genres]
    );

    // Way to optimize images
    // const optimizedImage = useMemo(() => {
    //     return game.background_image.replace('/media/', `/media/crop/600/400/`);
    // }, [game.background_image]);

    const tagsMemo = useMemo(() => game.tags, [game.tags]);
    const platformsMemo = useMemo(() => game.parent_platforms, [game.parent_platforms]);

    return (
        <View
            className="rounded-2xl overflow-hidden shadow-lg relative h-[240px] p-1"
            style={[{ backgroundColor: colors.surfaceVariant }, styles]}>
            <Image
                // source={{ uri: optimizedImage }}
                // source={{ uri: game.background_image }}
                // source={{ uri: optimizeImageUrl(game.background_image) }}
                // className="w-full h-full rounded-xl"
                source={game.background_image}
                style={{ width: '100%', height: '100%', borderRadius: BORDER_RADIUS_LG }}
                contentFit='cover'
                transition={300}
                cachePolicy={'memory-disk'} />

            <View className="absolute inset-[-0.1px] justify-between" style={{ backgroundColor: 'rgba(0,0,0,0.20)' }}>

                <View className="flex-row justify-between p-4">
                    {/* Game mode */}
                    <PlatformIcons items={tagsMemo} />

                    {/* Platforms */}
                    <PlatformIcons items={platformsMemo} horizontal />
                </View>

                {/* Game info */}
                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)', 'transparent']}
                    locations={[0, 0.75, 1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    className="gap-1 p-4 m-1"
                    style={{ borderRadius: 10 }}>

                    <View className="flex-row justify-between items-center">
                        {/* Name game */}
                        <Text variant="headlineMedium" className="text-white text-lg font-bold">{game.name}</Text>

                        {/* Rating */}
                        <View className="flex-row items-center">
                            <FontAwesome name="star" size={14} color={colorsApp.yellow} style={{ marginRight: 4 }} />
                            <Text variant='bodySmall' className="text-white">
                                {game.rating} ({game.ratings_count})
                            </Text>
                        </View>
                    </View>

                    <View className='flex-row justify-between items-center'>
                        {/* Gender */}
                        <Text variant='bodySmall' className="text-gray-200 mt-1">
                            {genresTextMemo}
                        </Text>

                        {/* Downloads */}
                        <Text variant='labelLarge' className="text-gray-300">{game.reviews_count} Downloads</Text>
                    </View>
                </LinearGradient>

            </View>
        </View>
    );
};

export default React.memo(AppGameCard);
