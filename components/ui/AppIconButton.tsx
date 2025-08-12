import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';

type AppIconButtonProps = {
    icon?: string;
    style?: any;
    onPress: () => void;
};

const AppIconButton = ({
    icon = '',
    style,
    onPress
}: AppIconButtonProps) => {

    const theme = useTheme();

    return (
        <IconButton
            onPress={onPress}
            icon={icon}
            iconColor={theme.colors.onBackground}
            containerColor={theme.colors.surface}
            size={28}
            style={[style, { width: 44, height: 44 }]}
        />
    );
};


export default AppIconButton;