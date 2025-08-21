import { useThemeStore } from '@/store/useThemeStore';
import React from 'react';
import { IconButton } from 'react-native-paper';

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

    const { currentTheme } = useThemeStore();

    return (
        <IconButton
            onPress={onPress}
            icon={icon}
            iconColor={currentTheme.text}
            containerColor={currentTheme.accent}
            size={28}
            style={[style, { width: 44, height: 44 }]}
        />
    );
};


export default AppIconButton;