import { useThemeStore } from '@/store/useThemeStore';
import { fontConfig } from '@/theme/fonts';
import { BORDER_RADIUS_LG } from '@/theme/paperTheme';
import React from 'react';
import { Button } from 'react-native-paper';

type GameOptionButtonProps = {
    text: string,
    onPress: () => void,
    state?: 'default' | 'correct' | 'wrong',
    disabled?: boolean,
}

const AppGameOptionButton = ({ text, onPress, state = 'default', disabled = false }: GameOptionButtonProps) => {

    const { currentTheme } = useThemeStore();

    const getColor = () => {
        switch (state) {
            case 'correct': return currentTheme.success;
            case 'wrong': return currentTheme.error;
            default: return currentTheme.accent;
        }
    }

    return (
        <Button
            mode="contained"
            onPress={() => !disabled && onPress()}
            buttonColor={getColor()}
            textColor={currentTheme.text}
            contentStyle={{ paddingVertical: 6, paddingHorizontal: 8 }}
            labelStyle={fontConfig.bodyMedium}
            style={{ borderRadius: BORDER_RADIUS_LG }} 
            disabled={disabled}>
            {text}
        </Button>
    );
}

export default AppGameOptionButton