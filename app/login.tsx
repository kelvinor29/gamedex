import FormInput from '@/components/form/FormInput'
import AppButton from '@/components/ui/AppButton'
import { useAuth } from '@/context/AuthContext'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native'
import { ActivityIndicator, Button, Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper'
import "../global.css"

type ControlProps = {
    email: string,
    password: string
}

const Login = () => {

    // Access the current theme colors defined in the app's theme configuration (react-native-paper)
    const { colors } = useTheme();

    const { signIn } = useAuth();

    // Form hook
    const { control, handleSubmit, formState: { errors } } = useForm<ControlProps>({});

    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);


    // Handle form submission
    const onSubmit = async (userData: ControlProps) => {
        try {
            setIsVerifying(true);
            await signIn(userData.email, userData.password);
        } catch (err) {
            setError("Invalid email or password.");
        } finally {
            setIsVerifying(false);
        }
    };

    return (

        <View
            className='flex-1'
            style={{ backgroundColor: colors.background }}>

            {/* Adjust the view so that the keyboard doesn't cover important content */}
            <KeyboardAvoidingView
                className='flex-1'
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>

                <ScrollView
                    className='flex-1'
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}
                    keyboardShouldPersistTaps="handled" >
                        
                    {/* Close the keyboard when the user touches another part of the screen */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                        <View className="w-full justify-center landscape:flex-row landscape:items-center px-4">

                            {/* Logo Section */}
                            <View className="relative items-center justify-center portrait:mb-5 landscape:flex-1">
                                <Image className='w-full h-20 mx-auto mb-16' resizeMode='contain' source={require('../assets/logo/gamedex-icon-transparent.png')} />
                                <Text variant="displayLarge" className='absolute bottom-7 pt-4'>GameDex</Text>
                                <Text variant="headlineMedium" className='mt-1'>Please enter your details to login.</Text>
                            </View>

                            {/* Form Section */}
                            <View className="gap-4 portrait:w-full landscape:flex-1 landscape:pl-4">
                                <FormInput
                                    name="email"
                                    label="Email"
                                    control={control}
                                    rules={{ required: 'Email is required' }} />

                                <FormInput
                                    name="password"
                                    label="Password"
                                    control={control}
                                    rules={{ required: 'Password is required' }}
                                    secureTextEntry />

                                <AppButton onPress={handleSubmit(onSubmit)} >
                                    Login
                                </AppButton>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>

            </KeyboardAvoidingView>

            <Portal>
                <>
                    {/* Loading Overlay */}
                    {isVerifying && (
                        <View className='flex-1 justify-center items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <ActivityIndicator size="large" />
                        </View>
                    )}

                    {/* Error Dialog */}
                    <Dialog visible={!!error} onDismiss={() => setError(null)}
                        theme={{
                            roundness: 2,
                        }}>

                        {/* Title */}
                        <View className='flex-row justify-center '>
                            <IconButton icon="shield-alert" iconColor={colors.error} />
                        </View>

                        <Dialog.Content>
                            <Text style={{ textAlign: 'center' }} variant="bodyMedium">{error}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setError(null)}>Ok</Button>
                        </Dialog.Actions>
                    </Dialog>
                </>
            </Portal>
        </View>

    )
}

export default Login