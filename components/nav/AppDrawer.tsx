import { useThemeStore } from '@/store/useThemeStore';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from "react";
import { View } from 'react-native';
import { Switch, Text } from "react-native-paper";

type CustomDrawerContentProps = DrawerContentComponentProps & {
    onLogout: () => void;
};

export default function CustomDrawerContent(props: CustomDrawerContentProps) {
    const { onLogout } = props;

    const { currentTheme, toggleTheme, mode } = useThemeStore();

    return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1, backgroundColor: currentTheme.background }}>

            <View className='pb-5 mt-auto'>

                {/* Dark Mode */}
                <View className='flex flex-row items-center justify-between p-4 mb-2'>
                    <Text variant='bodyMedium' style={{ color: currentTheme.text, marginLeft: 16 }}>Dark Mode</Text>
                    <Switch style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }} value={mode === 'dark'} onValueChange={toggleTheme} />
                </View>

                {/* Logout */}
                <DrawerItem
                    style={{ backgroundColor: currentTheme.accent }}
                    label="Logout"
                    labelStyle={{ color: currentTheme.text }}
                    icon={({ size }) => (
                        <FontAwesome6 name="right-from-bracket" size={size} color={currentTheme.primary} />
                    )}
                    onPress={onLogout}
                />
            </View>
        </DrawerContentScrollView>
    );
}