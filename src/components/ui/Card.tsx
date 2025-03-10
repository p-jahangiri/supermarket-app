import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { BORDER_RADIUS } from "../../constants/theme";
import { useTheme } from "../../store";

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
}

interface TouchableCardProps extends TouchableOpacityProps {
  style?: ViewStyle;
  children: React.ReactNode;
  variant?: "elevated" | "outlined" | "filled";
}

export const Card = ({ children, style }: CardProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.neutral[50],
          shadowColor: colors.neutral[900],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const TouchableCard = ({
  style,
  children,
  variant = "elevated",
  ...rest
}: TouchableCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        variant === "elevated" && {
          backgroundColor: colors.neutral[50],
          shadowColor: colors.neutral[900],
        },
        variant === "outlined" && {
          borderWidth: 1,
          borderColor: colors.neutral[200],
          backgroundColor: "transparent",
        },
        variant === "filled" && {
          backgroundColor: colors.neutral[100],
        },
        style,
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
