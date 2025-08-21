import PlatformIcons from '@/components/ui/AppPlatformIcons';
import { IGame } from '@/interfaces/IGame';
import { useThemeStore } from '@/store/useThemeStore';
import { BORDER_RADIUS_LG } from '@/theme/paperTheme';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

interface AppGameCardProps {
    game: IGame;
    styles?: StyleProp<ViewStyle>;
    isPortrait?: boolean;
}

const AppGameCard = ({ game, styles, isPortrait = false }: AppGameCardProps) => {
    const { currentTheme } = useThemeStore();

    // Avoid create strings/arrays per render
    const genresTextMemo = useMemo(() =>
        game.genres.slice(0, 2).join(' • '),
        [game.genres]
    );

    // Way to optimize images
    const optimizedImage = useMemo(() => {
        // Validate if the game has an img
        if (!game.background_image) return ''
        return game.background_image.replace('/media/', `/media/crop/600/400/`);
    }, [game.background_image]);

    const tagsMemo = useMemo(() => game.tags, [game.tags]);
    const platformsMemo = useMemo(() => game.parent_platforms, [game.parent_platforms]);

    return (
        <View
            className="
            rounded-2xl overflow-hidden shadow-lg relative p-1 
            portrait:h-[240px] landscape:h-[220px] "
            style={[{ backgroundColor: currentTheme.accent, flex: isPortrait ? 1 : 0 }, styles]}>
            <Image
                source={{ uri: optimizedImage }}
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
                        <Text variant="headlineMedium"
                            className="text-lg font-bold"
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={{ flexShrink: 1, color: currentTheme.white }}>
                            {game.name}
                        </Text>

                        {/* Rating */}
                        <View className="flex-row items-center">
                            <FontAwesome name="star" size={14} color={currentTheme.yellow} style={{ marginRight: 4 }} />
                            <Text variant='bodySmall' style={{ color: currentTheme.white }}>
                                {game.rating} ({game.ratings_count})
                            </Text>
                        </View>
                    </View>

                    <View className='flex-row justify-between items-center'>
                        {/* Gender */}
                        <Text variant='bodySmall' className=" mt-1" style={{ color: currentTheme.white }}>
                            {genresTextMemo}
                        </Text>

                        {/* Downloads */}
                        <Text variant='labelLarge' style={{ color: currentTheme.white }}>{game.reviews_count} Downloads</Text>
                    </View>
                </LinearGradient>

            </View>
        </View>
    );
};

export default React.memo(AppGameCard);
