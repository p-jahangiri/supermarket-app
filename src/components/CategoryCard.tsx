import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Category } from "../types";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { useTheme } from "../store";

interface CategoryCardProps {
  category: Category;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
  size?: "small" | "medium" | "large";
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  style,
  imageStyle,
  textStyle,
  size = "medium",
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handlePress = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("CategoryProducts", { categoryId: category.id });
  };

  // Determine dimensions based on size
  const getDimensions = () => {
    switch (size) {
      case "small":
        return { width: 100, height: 100 };
      case "medium":
        return { width: 140, height: 140 };
      case "large":
        return { width: 180, height: 180 };
      default:
        return { width: 140, height: 140 };
    }
  };

  // Determine font size based on size
  const getFontSize = () => {
    switch (size) {
      case "small":
        return FONT_SIZE.sm;
      case "medium":
        return FONT_SIZE.md;
      case "large":
        return FONT_SIZE.lg;
      default:
        return FONT_SIZE.md;
    }
  };

  const dimensions = getDimensions();
  const fontSize = getFontSize();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: dimensions.width,
          height: dimensions.height,
          ...SHADOWS.small,
        },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: category.image }}
        style={[
          styles.image,
          {
            width: dimensions.width,
            height: dimensions.height,
          },
          imageStyle,
        ]}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text
          style={[
            styles.name,
            {
              fontSize,
            },
            textStyle,
          ]}
          numberOfLines={2}
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const SHADOWS = {
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
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
    margin: 8,
  },
  image: {
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default CategoryCard;
