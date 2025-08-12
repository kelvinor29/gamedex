import React, { useMemo, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, Text, TextInput, useTheme } from 'react-native-paper';

type FormInputProps = {
    name: string;
    label: string;
    control: Control<any>;
    rules?: any;
    secureTextEntry?: boolean;

};

const FormInput = ({ name, label, control, rules, secureTextEntry = false }: FormInputProps) => {

    // Get global theme (light or dark)
    const theme = useTheme();

    // Hide password state
    const [hidePassword, setHidePassword] = useState(true);

    // Custom input theme
    const customInputTheme = useMemo(() => ({
        colors: {
            primary: theme.colors.primary,
            background: theme.colors.surface,
            text: theme.colors.onSurface,
            placeholder: theme.colors.outline,
            outline: theme.colors.surface,
            error: theme.colors.error,
            onError: theme.colors.onError
        },
    }), [theme]);

    return (

        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                field: { onChange, value }, fieldState: { error },
            }) => (
                <View>
                    <Text variant='headlineMedium' className='ms-3 mb-2'>{label}</Text>

                    <TextInput
                        placeholder={`Your ${label.toLowerCase()}...`}
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
                                    color={theme.colors.outline}
                                    size={20}
                                    icon={hidePassword ? 'eye-off' : 'eye'}
                                    onPress={() => setHidePassword(!hidePassword)}
                                />
                            ) : undefined
                        }
                    />

                    {error && (
                        <HelperText
                            type='error'
                            style={{ color: theme.colors.onError }}>
                            {error.message || `${label} is required`}
                        </HelperText>
                    )}
                </View>
            )}
        />

    );
};

export default FormInput;
