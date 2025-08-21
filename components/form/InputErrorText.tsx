import { useThemeStore } from "@/store/useThemeStore";
import React, { memo } from "react";
import { HelperText } from "react-native-paper";

type InputErrorTextProps = {
    errorMessage?: string;
};

const InputErrorText = memo(({ errorMessage }: InputErrorTextProps) => {
    const { currentTheme } = useThemeStore();

    if (!errorMessage) return null;

    return (
        <HelperText
            type='error'
            style={{ color: currentTheme.onError }}>
            {errorMessage}
        </HelperText>
    );
});
InputErrorText.displayName = 'InputErrorText';

export default InputErrorText;
