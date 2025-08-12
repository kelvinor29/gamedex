import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { colors } from './colors';
import { fonts } from './fonts';

export const BORDER_RADIUS_LG = 12;
export const createTheme = (mode: 'light' | 'dark') => {
    const baseTheme = mode === 'light' ? MD3LightTheme : MD3DarkTheme;
    const colorSet = colors[mode];

    return {
        ...baseTheme,
        roundness: BORDER_RADIUS_LG,

        // Global colors
        colors: {
            ...baseTheme.colors,
            primary: colors.primary,
            secondary: colors.tertiary,
            background: colorSet.background,
            surface: colorSet.accent,
            onSurface: colorSet.text,
            outline: colorSet.textSecondary,
            onBackground: colorSet.text,
            error: colorSet.error,
            onError: colorSet.onError,
        },
        fonts: fonts,
    };
};

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');