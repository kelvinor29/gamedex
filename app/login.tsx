import AppInput from '@/components/form/AppInput'
import AppButton from '@/components/ui/AppButton'
import { useAuth } from '@/context/AuthContext'
import { useThemeStore } from '@/store/useThemeStore'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from 'react-native'
import { ActivityIndicator, Button, Dialog, IconButton, Portal, Text } from 'react-native-paper'
import "../global.css"

type ControlProps = {
    email: string,
    password: string
}

const Login = () => {

    const { currentTheme } = useThemeStore();

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
            style={{ backgroundColor: currentTheme.background }}>

            {/* Adjust the view so that the keyboard doesn't cover important content */}
            <KeyboardAvoidingView
                className='flex-1'
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>

                <ScrollView
                    className='flex-1'
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
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
                                <AppInput
                                    name="email"
                                    label="Your email..."
                                    control={control}
                                    rules={{ required: 'Email is required' }} />

                                <AppInput
                                    name="password"
                                    label="Your password..."
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
                            <IconButton icon="shield-alert" iconColor={currentTheme.error} />
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