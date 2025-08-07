import { configureFonts } from 'react-native-paper';

export const fontConfig = {
    displayHuge: {
        fontFamily: 'Satisfy_400Regular',
        fontSize: 48,
        lineHeight: 54
    },
    displayFancy: {
        fontFamily: 'Satisfy_400Regular',
        fontSize: 24,
        lineHeight: 30,
    },
    displayLarge: {
        fontFamily: 'Quicksand_700Bold',
        fontSize: 34,
        lineHeight: 40,
    },
    displayMedium: {
        fontFamily: 'Quicksand_600SemiBold',
        fontSize: 32,
        lineHeight: 38,
    },
    headlineLarge: {
        fontFamily: 'Quicksand_700Bold',
        fontSize: 18,
        lineHeight: 24,
    },
    headlineMedium: {
        fontFamily: 'Quicksand_700Bold',
        fontSize: 18,
        lineHeight: 22,
    },
    bodyLarge: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        lineHeight: 28,
    },
    bodyMedium: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        lineHeight: 24,
    },
    bodySmall: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
    },
    
};

export const fonts = configureFonts({
    config: fontConfig,
    isV3: true,
});
