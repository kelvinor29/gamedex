import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { colors } from './colors';
import { fonts } from './fonts';

export const BORDER_RADIUS_LG = 12;
export const BORDER_RADIUS_MD = 8;
export const BORDER_RADIUS_SM = 5;

export const createTheme = (mode: 'light' | 'dark') => {
    const baseTheme = mode === 'light' ? MD3LightTheme : MD3DarkTheme;
    const colorSet = colors[mode];

    return {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: colors.primary,
            secondary: colors.tertiary,
            background: colorSet.background,
            surface: colorSet.accent,
            onSurface: colorSet.text,
            text: colorSet.text,
            outline: colorSet.textSecondary,
            onBackground: colorSet.text,
            error: colorSet.error,
            onError: colorSet.onError,

            white: colors.white,
        },
        fonts: fonts,
    };
};

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');
