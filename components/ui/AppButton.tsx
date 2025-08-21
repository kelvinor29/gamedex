import { useThemeStore } from '@/store/useThemeStore';
import { fontConfig } from '@/theme/fonts';
import { BORDER_RADIUS_LG } from '@/theme/paperTheme';
import React, { ReactNode } from 'react';
import { Button } from 'react-native-paper';

type AppButtonProps = {
    mode?: 'contained' | 'text';
    colorType?: 'primary' | 'secondary';
    disabled?: boolean;
    children?: ReactNode;
    loading?: boolean;
    onPress: () => void;
};

const AppButton = ({
    mode = 'contained',
    colorType = 'primary',
    disabled = false,
    children,
    loading = false,
    onPress,
}: AppButtonProps) => {

    const { currentTheme } = useThemeStore();

    const backgroundColor =
        mode === 'contained'
            ? colorType === 'secondary'
                ? currentTheme.accent
                : currentTheme.primary
            : 'transparent';

    const textColor =
        mode === 'contained'
            ? currentTheme.white
            : currentTheme.primary;

    return (
        <Button
            mode={mode}
            disabled={disabled}
            loading={loading}
            textColor={textColor}
            onPress={onPress}
            buttonColor={backgroundColor}
            contentStyle={{
                paddingVertical: 4,
                paddingHorizontal: 8
            }}
            labelStyle={fontConfig.bodyMedium}
            style={
                { borderRadius: BORDER_RADIUS_LG, }}>
            {children}
        </Button>
    );
};


export default AppButton;