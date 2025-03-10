// Light Theme Colors
export const LIGHT_COLORS = {
  primary: {
    DEFAULT: "#3B82F6", // Blue
    light: "#93C5FD",
    dark: "#1D4ED8",
  },
  secondary: {
    DEFAULT: "#10B981", // Green
    light: "#6EE7B7",
    dark: "#047857",
  },
  accent: {
    DEFAULT: "#F59E0B", // Amber
    light: "#FCD34D",
    dark: "#B45309",
  },
  neutral: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
  error: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  info: "#3B82F6",
  background: "#FFFFFF",
  card: "#FFFFFF",
  text: "#1F2937",
};

// Dark Theme Colors
export const DARK_COLORS = {
  primary: {
    DEFAULT: "#60A5FA", // Lighter Blue for dark mode
    light: "#93C5FD",
    dark: "#2563EB",
  },
  secondary: {
    DEFAULT: "#34D399", // Lighter Green for dark mode
    light: "#6EE7B7",
    dark: "#059669",
  },
  accent: {
    DEFAULT: "#FBBF24", // Lighter Amber for dark mode
    light: "#FCD34D",
    dark: "#D97706",
  },
  neutral: {
    50: "#18181B", // Inverted for dark mode
    100: "#27272A",
    200: "#3F3F46",
    300: "#52525B",
    400: "#71717A",
    500: "#A1A1AA",
    600: "#D4D4D8",
    700: "#E4E4E7",
    800: "#F4F4F5",
    900: "#FAFAFA",
  },
  error: "#F87171", // Lighter red for dark mode
  warning: "#FBBF24",
  success: "#34D399",
  info: "#60A5FA",
  background: "#121212", // Dark background
  card: "#1E1E1E", // Dark card
  text: "#F9FAFB", // Light text for dark mode
};

// Default to light theme
export const COLORS = LIGHT_COLORS;

export const FONT = {
  light: "Poppins_300Light",
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
};

export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
