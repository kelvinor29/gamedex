import { darkTheme, lightTheme } from '@/theme/paperTheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from "react";
import { View } from 'react-native';
import { Switch, Text } from "react-native-paper";

type CustomDrawerContentProps = DrawerContentComponentProps & {
    isDark: boolean;
    setIsDark: (val: boolean) => void;
    onLogout: () => void;
};

export default function CustomDrawerContent(props: CustomDrawerContentProps) {
    const { isDark, setIsDark, onLogout } = props;
    const currentTheme = isDark ? darkTheme : lightTheme;

    return (
        <DrawerContentScrollView contentContainerStyle={{ flex: 1, backgroundColor: currentTheme.colors.background }}>

            <View className='pb-5 mt-auto'>

                {/* Dark Mode */}
                <View className='flex flex-row items-center justify-between p-4 mb-2'>
                    <Text variant='bodyMedium' style={{ color: currentTheme.colors.onBackground, marginLeft: 16 }}>Dark Mode</Text>
                    <Switch style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }} value={isDark} onValueChange={setIsDark} />
                </View>

                {/* Logout */}
                <DrawerItem
                    style={{ backgroundColor: currentTheme.colors.surface }}
                    label="Logout"
                    labelStyle={{ color: currentTheme.colors.onBackground }}
                    icon={({ size }) => (
                        <FontAwesome6 name="right-from-bracket" size={size} color={currentTheme.colors.primary} />
                    )}
                    onPress={onLogout}
                />
            </View>
        </DrawerContentScrollView>
    );
}