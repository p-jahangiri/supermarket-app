import React from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHT_COLORS, DARK_COLORS } from "../constants/theme";
import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from "react-native";

type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  colors: typeof LIGHT_COLORS | typeof DARK_COLORS;
  systemTheme: ColorSchemeName;
}

interface ThemeActions {
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setSystemTheme: (theme: ColorSchemeName) => void;
}

interface ThemeStore extends ThemeState, ThemeActions {}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: "system",
      isDark: false,
      colors: LIGHT_COLORS,
      systemTheme: "light",

      setMode: (mode: ThemeMode) => {
        const { systemTheme } = get();
        const isDark =
          mode === "dark" || (mode === "system" && systemTheme === "dark");

        set({
          mode,
          isDark,
          colors: isDark ? DARK_COLORS : LIGHT_COLORS,
        });
      },

      toggleTheme: () => {
        const { mode } = get();
        const newMode = mode === "light" ? "dark" : "light";
        get().setMode(newMode);
      },

      setSystemTheme: (theme: ColorSchemeName) => {
        const { mode } = get();
        const isDark =
          mode === "dark" || (mode === "system" && theme === "dark");

        set({
          systemTheme: theme,
          isDark: isDark,
          colors: isDark ? DARK_COLORS : LIGHT_COLORS,
        });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Custom hook to use theme
export const useTheme = () => {
  const systemColorScheme = _useColorScheme();
  const { mode, isDark, colors, setMode, toggleTheme, setSystemTheme } =
    useThemeStore();

  // Update system theme when it changes
  React.useEffect(() => {
    setSystemTheme(systemColorScheme);
  }, [systemColorScheme, setSystemTheme]);

  return {
    mode,
    isDark,
    colors,
    setMode,
    toggleTheme,
  };
};
