import CustomDrawerContent from "@/components/ui/AppDrawer";
import AppIconButton from "@/components/ui/AppIconButton";
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { Quicksand_600SemiBold, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, Text } from 'react-native-paper';
import 'react-native-reanimated';
import { darkTheme, lightTheme } from '../theme/paperTheme';


export default function RootStack() {
    return (
        <AuthProvider>
            <RootLayout />
        </AuthProvider>
    );
}

export function RootLayout() {

    const { verifyingUser, logout } = useAuth();

    // Get current color scheme
    const systemScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemScheme === "dark");

    useEffect(() => {
        setIsDarkMode(systemScheme === "dark");
    }, [systemScheme]);

    const currentTheme = isDarkMode ? darkTheme : lightTheme;

    // Load fonts
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Quicksand_600SemiBold,
        Quicksand_700Bold,
        Satisfy_400Regular,
    });

    // Check if the fonts are not fully loaded yet
    // and check if there is a user already logged
    if (!fontsLoaded || verifyingUser) {
        return (
            <PaperProvider theme={currentTheme}>
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: currentTheme.colors.background }}>
                    <ActivityIndicator size="large" color={currentTheme.colors.primary} />
                </View>
            </PaperProvider>
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={currentTheme}>
                <Drawer
                    drawerContent={(props) => (
                        <CustomDrawerContent
                            {...props}
                            isDark={isDarkMode}
                            setIsDark={setIsDarkMode}
                            onLogout={logout}
                        />
                    )}
                    screenOptions={({ navigation }) => ({
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <AppIconButton
                                onPress={() => navigation.toggleDrawer()}
                                icon="account-circle"
                                style={{ marginLeft: 16 }}
                            />
                        ),
                        headerStyle: {
                            backgroundColor: currentTheme.colors.background,
                        },
                        headerTitle() {
                            return (
                                <View className="flex-row items-center gap-3">
                                    <Image
                                        source={require('../assets/logo/gamedex-icon-transparent.png')}
                                        style={{ width: 34, height: 34 }}
                                        resizeMode="contain"
                                    />
                                    <Text
                                        variant="headlineLarge"
                                        className="pt-2 pb-2 text-center"
                                        style={{ color: currentTheme.colors.onSurface }}>
                                        GameDex
                                    </Text>
                                </View>
                            )
                        },
                    })}
                />
            </PaperProvider>
        </GestureHandlerRootView>
    );
}