import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import AppTabNav from '@/components/nav/AppTabNav';

export default function TabsLayout() {
    return (
        <Tabs
            tabBar={(props) => <AppTabNav {...props} />}
            screenOptions={{
                headerShown: false,
            }}>

            <Tabs.Screen
                name="home/home"
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 size={20} name="house-chimney" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="game/game"
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 size={20} name="gamepad" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
