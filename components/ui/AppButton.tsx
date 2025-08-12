import { colors } from '@/theme/colors';
import { BORDER_RADIUS_LG } from '@/theme/paperTheme';
import React, { ReactNode } from 'react';
import { Button, useTheme } from 'react-native-paper';

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

    const theme = useTheme();

    const backgroundColor =
        mode === 'contained'
            ? colorType === 'secondary'
                ? theme.colors.surface
                : theme.colors.primary
            : 'transparent';

    const textColor =
        mode === 'contained'
            ? colors.white
            : theme.colors.primary;

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
            labelStyle={theme.fonts.bodyMedium}
            style={
                { borderRadius: BORDER_RADIUS_LG, }}>
            {children}
        </Button>
    );
};


export default AppButton;