import { configureFonts } from 'react-native-paper';

export const fontConfig = {
    displayLarge: {
        fontFamily: 'Satisfy_400Regular',
        fontSize: 57,
        lineHeight: 54
    },
    displayFancy: {
        fontFamily: 'Satisfy_400Regular',
        fontSize: 24,
        lineHeight: 30,
    },
    displayMedium: {
        fontFamily: 'Quicksand_600SemiBold',
        fontSize: 32,
        lineHeight: 38,
    },
    headlineLarge: {
        fontFamily: 'Satisfy_400Regular',
        fontSize: 32,
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
        lineHeight: 24,
    },
    labelLarge: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        lineHeight: 18,
    },
};

export const fonts = configureFonts({
    config: fontConfig,
    isV3: true,
});
