import { colors } from "@/theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ThemeModeOptions = 'light' | 'dark';

interface IThemeMode {
    currentTheme: typeof colors['dark'];
    mode: ThemeModeOptions;
    toggleTheme: () => void;
    setThemeMode: (mode: ThemeModeOptions) => void;
}

export const useThemeStore = create<IThemeMode>()(
    persist(
        (set, get) => ({
            mode: Appearance.getColorScheme() ?? 'dark', // Default
            currentTheme: colors[Appearance.getColorScheme() ?? 'dark'],
            toggleTheme: () => {
                const newMode = get().mode === 'light' ? 'dark' : 'light';
                set({ mode: newMode, currentTheme: colors[newMode] });
            },
            setThemeMode: (mode: ThemeModeOptions) => set({ mode, currentTheme: colors[mode] })
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);