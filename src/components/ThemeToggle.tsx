import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../store";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";

interface ThemeToggleProps {
  style?: ViewStyle;
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  style,
  showLabel = true,
}) => {
  const { mode, isDark, colors, setMode } = useTheme();

  const handleToggle = () => {
    if (mode === "system") {
      setMode(isDark ? "light" : "dark");
    } else {
      setMode(mode === "light" ? "dark" : "light");
    }
  };

  const handleSystemTheme = () => {
    setMode("system");
  };

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <Text style={[styles.label, { color: colors.text }]}>
          {mode === "system"
            ? STRINGS.SYSTEM_THEME
            : mode === "light"
            ? STRINGS.LIGHT_MODE
            : STRINGS.DARK_MODE}
        </Text>
      )}

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            {
              backgroundColor:
                mode === "light" || (mode === "system" && !isDark)
                  ? colors.primary.DEFAULT
                  : colors.neutral[200],
            },
          ]}
          onPress={() => setMode("light")}
        >
          <Ionicons
            name="sunny-outline"
            size={20}
            color={
              mode === "light" || (mode === "system" && !isDark)
                ? colors.neutral[50]
                : colors.neutral[600]
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            {
              backgroundColor:
                mode === "system"
                  ? colors.primary.DEFAULT
                  : colors.neutral[200],
            },
          ]}
          onPress={handleSystemTheme}
        >
          <Ionicons
            name="phone-portrait-outline"
            size={20}
            color={mode === "system" ? colors.neutral[50] : colors.neutral[600]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            {
              backgroundColor:
                mode === "dark" || (mode === "system" && isDark)
                  ? colors.primary.DEFAULT
                  : colors.neutral[200],
            },
          ]}
          onPress={() => setMode("dark")}
        >
          <Ionicons
            name="moon-outline"
            size={20}
            color={
              mode === "dark" || (mode === "system" && isDark)
                ? colors.neutral[50]
                : colors.neutral[600]
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: "row",
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ThemeToggle;
