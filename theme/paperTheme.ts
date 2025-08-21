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
            primary: colorSet.primary,
            // secondary: colorSet.tertiary,
            // background: colorSet.background,
            // surface: colorSet.accent,
            // accent: colorSet.accent,
            // onSurface: colorSet.text,
            // outline: colorSet.textSecondary,
            // onBackground: colorSet.text,
            // error: colorSet.error,
            // onError: colorSet.onError,
            // red_transp_03: colorSet.red_transp_03,
            // red_light: colorSet.red_light,
            // success: colorSet.success,
        },
        fonts: fonts,
    };
};

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');