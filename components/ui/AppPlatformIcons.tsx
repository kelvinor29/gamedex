import { useThemeStore } from '@/store/useThemeStore';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

interface IItemIcon {
    name: string;
    IconComponent: typeof FontAwesome6 | typeof MaterialCommunityIcons | ImageSourcePropType;
    isImage?: boolean;
    iconColor?: string;
}

const itemIconMap: Record<string, IItemIcon> = {
    // Platforms icons
    'pc': { name: 'microsoft-windows', IconComponent: MaterialCommunityIcons, iconColor: '#40A9FF' },
    'playstation': { name: 'playstation', IconComponent: FontAwesome6, iconColor: '#4F86F7' },
    'xbox': { name: 'xbox', IconComponent: FontAwesome6, iconColor: '#58AF00' },
    'nintendo': { name: 'nintendo-switch', IconComponent: MaterialCommunityIcons, iconColor: '#FF4F4F' },
    'ios': { name: 'apple', IconComponent: FontAwesome6, iconColor: '#D1D1D6' },
    'android': { name: 'android', IconComponent: FontAwesome6, iconColor: '#58AF00' },
    'apple macintosh': { name: 'apple', IconComponent: FontAwesome6, iconColor: '#D1D1D6' },
    'linux': { name: 'linux', IconComponent: FontAwesome6, iconColor: '#FFD966' },
    'atari': { name: 'gamepad-variant', IconComponent: MaterialCommunityIcons, iconColor: '#FF8080' },
    'commodore / amiga': { name: 'desktop-classic', IconComponent: MaterialCommunityIcons, iconColor: '#89CFF0' },
    'sega': { name: 'controller-classic', IconComponent: MaterialCommunityIcons, iconColor: '#6CA0DC' },
    '3do': { name: 'gamepad-variant', IconComponent: MaterialCommunityIcons, iconColor: '#FFB347' },
    'neo geo': { name: 'gamepad-variant', IconComponent: MaterialCommunityIcons, iconColor: '#FFF275' },
    'web': { name: 'globe', IconComponent: FontAwesome6, iconColor: '#5BC0EB' },

    // Game modes icons
    'singleplayer': { name: 'singleplayer', IconComponent: require('../../assets/images/icon-singleplayer.png'), isImage: true },
    'multiplayer': { name: 'multiplayer', IconComponent: require('../../assets/images/icon-multiplayer.png'), isImage: true },
};

interface IIconsListProps {
    items: string[];
    size?: number;
    color?: string;
    horizontal?: boolean;
}

const AppIconListCardGame = ({
    items,
    size = 12,
    color = 'white',
    horizontal = false
}: IIconsListProps) => {
    const { currentTheme } = useThemeStore();

    // Avoid duplicate icons
    const renderedIconNames = new Set<string>();

    return (
        <View className={`${horizontal ? 'flex-row' : 'flex-col'} gap-1`}>

            {items.map((i) => {
                const iconInfo = itemIconMap[i.toLowerCase()];

                // Check if the icon has any info or if the icon is already rendered
                if (!iconInfo || renderedIconNames.has(iconInfo.name)) return null;

                // Add the icon name to the renderedIcons set
                renderedIconNames.add(iconInfo.name);

                const { name, IconComponent, isImage } = iconInfo;

                if (isImage) {
                    return (
                        <View
                            className='rounded-xl w-6 h-6 justify-center items-center'
                            style={{ backgroundColor: currentTheme.tertiary }}
                            key={i}>
                            <Image
                                source={IconComponent}
                                style={{
                                    width: size,
                                    height: size,
                                    tintColor: color,
                                }}
                                resizeMode="contain" />
                        </View>
                    );
                }

                const VectorIcon = IconComponent as typeof FontAwesome6;
                return (
                    <View
                        className='rounded-xl w-6 h-6 justify-center items-center'
                        style={{ backgroundColor: currentTheme.tertiary }}
                        key={i}>

                        <VectorIcon
                            name={name}
                            size={size}
                            color={iconInfo.iconColor || color} />
                    </View>
                )
            })}
        </View >
    );
};

export default AppIconListCardGame;