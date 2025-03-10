import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { BORDER_RADIUS, FONT_SIZE } from "../../constants/theme";
import { useTheme } from "../../store";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.neutral[300];

    switch (variant) {
      case "primary":
        return colors.primary.DEFAULT;
      case "secondary":
        return colors.secondary.DEFAULT;
      case "outline":
      case "text":
        return "transparent";
      default:
        return colors.primary.DEFAULT;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.neutral[500];

    switch (variant) {
      case "primary":
      case "secondary":
        return colors.neutral[50];
      case "outline":
        return colors.primary.DEFAULT;
      case "text":
        return colors.primary.DEFAULT;
      default:
        return colors.neutral[50];
    }
  };

  const getBorderColor = () => {
    if (disabled) return colors.neutral[300];

    switch (variant) {
      case "outline":
        return colors.primary.DEFAULT;
      default:
        return "transparent";
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case "small":
        return styles.buttonSmall;
      case "large":
        return styles.buttonLarge;
      default:
        return styles.buttonMedium;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return styles.textSmall;
      case "large":
        return styles.textLarge;
      default:
        return styles.textMedium;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonSize(),
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === "outline" ? 1 : 0,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "outline" || variant === "text"
              ? colors.primary.DEFAULT
              : colors.neutral[50]
          }
        />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              getTextSize(),
              { color: getTextColor() },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  textSmall: {
    fontSize: FONT_SIZE.sm,
  },
  textMedium: {
    fontSize: FONT_SIZE.md,
  },
  textLarge: {
    fontSize: FONT_SIZE.lg,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default Button;
