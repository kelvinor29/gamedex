import { useThemeStore } from '@/store/useThemeStore';
import React, { useCallback, useMemo, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import InputErrorText from './InputErrorText';

interface AppInputProps {
    name: string;
    label: string;
    isLabel?: boolean;
    control?: Control<any>;
    rules?: RegisterOptions;
    secureTextEntry?: boolean;

    // Props without react hook form
    value?: string;
    onChangeText?: (text: string) => void;
    errorText?: string;
};

const AppInput = ({
    name, label, control, rules, secureTextEntry = false,
    value, onChangeText
}: AppInputProps) => {

    const { currentTheme } = useThemeStore();

    // Hide password state
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = useCallback(() => {
        setHidePassword((prev) => !prev);
    }, []);

    // Custom input theme
    const customInputTheme = useMemo(() => ({
        colors: {
            primary: currentTheme.primary,
            background: currentTheme.accent,
            text: currentTheme.text,
            placeholder: currentTheme.textSecondary,
            outline: currentTheme.accent,
            error: currentTheme.error,
            onError: currentTheme.onError
        },
    }), [currentTheme]);

    // Validate if the input use controllers and use the component with it (login view inputs)
    if (control) {
        return (
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View>
                        <Text variant='headlineMedium' className='ms-3 mb-2'>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>

                        <TextInput
                            placeholder={label}
                            value={value}
                            onChangeText={onChange}
                            style={{ height: 50 }}

                            mode="outlined"
                            theme={customInputTheme}

                            error={!!error}
                            secureTextEntry={secureTextEntry && hidePassword}
                            right={
                                secureTextEntry ? (
                                    <TextInput.Icon
                                        color={currentTheme.textSecondary}
                                        size={20}
                                        icon={hidePassword ? 'eye-off' : 'eye'}
                                        onPress={togglePasswordVisibility}
                                    />
                                ) : undefined
                            }
                        />

                        {error?.message && <InputErrorText errorMessage={error.message} />}
                    </View>
                )}
            />
        );
    }

    // With out controllers (home view input search)
    return (
        <TextInput
            value={value}
            placeholder={label}
            onChangeText={onChangeText}
            style={{ height: 50 }}

            mode="outlined"
            theme={customInputTheme}
            right={
                value ? (
                    <TextInput.Icon
                        icon="close-circle"
                        size={20}
                        onPress={() => onChangeText?.('')}
                        forceTextInputFocus={false}
                    />
                ) : undefined
            }
            left={<TextInput.Icon icon="magnify" size={20} />}
        />
    );

};

export default AppInput;