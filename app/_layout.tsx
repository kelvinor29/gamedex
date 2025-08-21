import CustomDrawerContent from "@/components/nav/AppDrawer";
import AppIconButton from "@/components/ui/AppIconButton";
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useHeaderGameStore } from "@/store/useHeaderGameStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Quicksand_600SemiBold, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { Satisfy_400Regular } from '@expo-google-fonts/satisfy';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { Appearance, Image, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, PaperProvider, Text } from 'react-native-paper';
import { darkTheme, lightTheme } from '../theme/paperTheme';

const queryClient = new QueryClient();

export default function RootStack() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RootLayout />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export function RootLayout() {

    const { verifyingUser, logout } = useAuth();

    const { restartGame } = useHeaderGameStore();

    // Get current system theme
    const { mode, setThemeMode, currentTheme } = useThemeStore();

    // Current theme for rn Paper
    const currentThemePaper = mode === 'dark' ? darkTheme : lightTheme;

    // Apply system scheme just if there is not a persist value 
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme) setThemeMode(colorScheme);
        });

        return () => subscription.remove();
    }, []);

    // Load fonts
    const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold, Quicksand_600SemiBold, Quicksand_700Bold, Satisfy_400Regular });

    // Check if the fonts are not fully loaded yet
    // and check if there is a user already logged
    if (!fontsLoaded || verifyingUser) {
        return (
            <PaperProvider theme={currentThemePaper}>
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: currentTheme.background }}>
                    <ActivityIndicator size="large" color={currentTheme.primary} />
                </View>
            </PaperProvider>
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={currentThemePaper}>
                <Drawer
                    drawerContent={(props) => (
                        <CustomDrawerContent
                            {...props}
                            onLogout={logout}
                        />
                    )}
                    screenOptions={({ navigation, route }) => {
                        return {
                            // Hide the header and disable the swipe gesture for the login screen
                            headerShown: route.name !== 'login',
                            swipeEnabled: route.name !== 'login',
                            headerTitleAlign: 'center',
                            headerLeft: () => (
                                <AppIconButton
                                    onPress={() => navigation.toggleDrawer()}
                                    icon="account-circle"
                                    style={{ marginLeft: 16 }}
                                />
                            ),
                            headerRight: () => (
                                getFocusedRouteNameFromRoute(route) === 'game/game' ? (
                                    <AppIconButton
                                        icon="refresh"
                                        onPress={restartGame}
                                        style={{ marginRight: 16 }}
                                    />
                                ) : null
                            ),
                            headerStyle: {
                                backgroundColor: currentTheme.background,
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
                                            style={{ color: currentTheme.text }}>
                                            GameDex
                                        </Text>
                                    </View>
                                )
                            },
                        }
                    }}>
                </Drawer>
            </PaperProvider>
        </GestureHandlerRootView >
    );
}