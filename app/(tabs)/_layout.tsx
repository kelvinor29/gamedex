import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
    const { colors } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.outline,
                tabBarShowLabel: true,
                tabBarStyle: {
                    borderTopWidth: 0.2,
                    borderTopColor: colors.primaryContainer,
                    backgroundColor: colors.background,
                    ...Platform.select({
                        ios: {
                            // Use a transparent background on iOS to show the blur effect
                            position: 'absolute',
                        },
                        default: {},
                    })
                },
            }}>

            <Tabs.Screen
                name='home/home'
                options={{
                    title: 'Home', tabBarIcon: ({ color }) =>
                        <FontAwesome6 size={24}
                            name='house-chimney'
                            color={color} />
                }} />

            <Tabs.Screen
                name='game/game'
                options={{
                    title: 'Game', tabBarIcon: ({ color }) =>
                        <FontAwesome6 size={24}
                            name='gamepad'
                            color={color} />
                }} />

        </Tabs>
    );
}
