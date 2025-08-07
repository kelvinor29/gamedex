import { Inter_400Regular, useFonts as useInter } from '@expo-google-fonts/inter';
import { Quicksand_600SemiBold, Quicksand_700Bold, useFonts as useQuicksand } from '@expo-google-fonts/quicksand';
import { Satisfy_400Regular, useFonts as useSatisfy } from '@expo-google-fonts/satisfy';
import { useColorScheme, View } from 'react-native';
import { ActivityIndicator, PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from '../theme/paperTheme';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Slot } from 'expo-router';
import 'react-native-reanimated';

export default function RootLayout() {

    // Get current color scheme
    const scheme = useColorScheme();
    const currentTheme = scheme === "dark" ? darkTheme : lightTheme;

    const { loading } = useAuth();

    // Load fonts
    const [quicksandLoaded] = useQuicksand({ Quicksand_700Bold, Quicksand_600SemiBold });
    const [interLoaded] = useInter({ Inter_400Regular });
    const [satisfyLoaded] = useSatisfy({ Satisfy_400Regular });

    const allFontsLoaded = quicksandLoaded && interLoaded && satisfyLoaded;

    // Check if the fonts are not fully loaded yet
    // and check if there is a user already logged
    if (!allFontsLoaded || !loading) {
        return (
            <PaperProvider theme={currentTheme}>
                <View className='flex-1 justify-center items-center' style={{ backgroundColor: currentTheme.colors.background }}>
                    <ActivityIndicator size="large" />
                </View>
            </PaperProvider>
        )
    }

    return (
        <PaperProvider theme={currentTheme}>
            <AuthProvider>
                <View className='flex-1' style={{ backgroundColor: currentTheme.colors.background }}>
                    <Slot />
                </View>
            </AuthProvider>
        </PaperProvider>
    );
}

