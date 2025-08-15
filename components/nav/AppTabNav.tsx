import { colors } from '@/theme/colors';
import { BORDER_RADIUS_LG, darkTheme, lightTheme } from "@/theme/paperTheme";
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const AppTabNav = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    // Get current color scheme
    const systemScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemScheme === "dark");

    useEffect(() => {
        setIsDarkMode(systemScheme === "dark");
    }, [systemScheme]);

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
                borderRadius: BORDER_RADIUS_LG,
            }}
            className="flex flex-row justify-between items-center mx-4 my-3 p-3 shadow-md absolute bottom-0 gap-3">

            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const icon = options.tabBarIcon
                    ? options.tabBarIcon({
                        focused: isFocused,
                        color: isFocused ? colors.white : theme.colors.outline,
                        size: 24,
                    })
                    : null;

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{
                            backgroundColor: isFocused ? theme.colors.primary : theme.colors.surface,
                            borderRadius: BORDER_RADIUS_LG,
                        }}
                        className="flex-1 p-3 justify-center items-center"
                        activeOpacity={0.9}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        importantForAccessibility="auto">
                        {icon}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default AppTabNav


