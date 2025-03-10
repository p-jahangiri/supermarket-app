import React, { useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  ImageStyle,
  TextStyle,
  Animated,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { BORDER_RADIUS, FONT_SIZE } from "../constants/theme";
import { useTheme } from "../store";
import { Category, RootStackParamList } from "../types";

type NavigationProp = StackNavigationProp<RootStackParamList>;

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
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    navigation.navigate("CategoryProducts", {
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const getDimensions = () => {
    switch (size) {
      case "small":
        return { width: 80, height: 80 };
      case "large":
        return { width: 160, height: 160 };
      case "medium":
      default:
        return { width: 120, height: 120 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return FONT_SIZE.xs;
      case "large":
        return FONT_SIZE.lg;
      case "medium":
      default:
        return FONT_SIZE.sm;
    }
  };

  const dimensions = getDimensions();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, style]}
    >
      <Animated.View
        style={[styles.card, dimensions, { transform: [{ scale: scaleAnim }] }]}
      >
        <Image
          source={{ uri: category.image }}
          style={[styles.image, dimensions, imageStyle]}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
        >
          <Text
            style={[styles.name, { fontSize: getFontSize() }, textStyle]}
            numberOfLines={2}
          >
            {category.name}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  card: {
    borderRadius: BORDER_RADIUS.md,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default CategoryCard;
