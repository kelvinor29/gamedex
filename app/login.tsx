import FormInput from '@/components/form/FormInput'
import AppButton from '@/components/ui/AppButton'
import { auth } from '@/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { Image, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native'
import { ActivityIndicator, Button, Dialog, IconButton, Portal, Text, useTheme } from 'react-native-paper'
import "../global.css"

type ControlProps = {
    email: string,
    password: string
}

const Login = () => {

    // Access the current theme colors defined in the app's theme configuration (react-native-paper)
    const { colors } = useTheme();

    // Form hook
    const { control, handleSubmit, formState: { errors } } = useForm<ControlProps>({});

    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Register 
    async function signUp(email: string, password: string) {
        try {
            // Create a new user with the provided email and password
            await createUserWithEmailAndPassword(auth, email, password);

        } catch (error: any) {
            // Handle errors that occur during user creation
            alert(error.message);
        }
    }

    // Login
    async function signIn(email: string, password: string) {
        try {
            setIsVerifying(true);
            setError(null);

            // Sign in the user with the provided email and password
            await signInWithEmailAndPassword(auth, email, password);

        } catch (error: any) {
            // Handle errors that occur during user creation
            setError('Invalid email or password.');
        } finally {
            setIsVerifying(false);
        }
    }

    // Handle form submission
    const onSubmit = async (userData: ControlProps) => {
        Keyboard.dismiss(); // Close keyboard
        await signIn(userData.email, userData.password);
    }

    return (

        <View
            className='flex-1 px-4'
            style={{ backgroundColor: colors.background }}>

            {/* Adjust the view so that the keyboard doesn't cover important content */}
            <KeyboardAvoidingView
                className='flex h-full w-full'
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>

                {/* Close the keyboard when the user touches another part of the screen */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View className='flex-1 justify-center gap-4'>

                        {/* Logo */}
                        <View className='relative w-full flex justify-center items-center'>
                            <Image className='w-full h-56 mx-auto' resizeMode='contain' source={require('../assets/logo/gamedex-transparent.png')} />
                            <Text variant="headlineMedium" className='text-center absolute bottom-1'>Please enter your details to login.</Text>
                        </View>

                        {/* Form Inputs */}
                        <View className='gap-4 mb-2'>
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
                        </View>

                        {/*  loading={isVerifying}> */}
                        <AppButton onPress={handleSubmit(onSubmit)} >
                            Login
                        </AppButton>
                    </View>

                </TouchableWithoutFeedback>

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
                            <Text variant="bodyMedium">{error}</Text>
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