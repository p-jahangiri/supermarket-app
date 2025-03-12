import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Product, RootStackParamList } from "../types";
import { FONT_SIZE, BORDER_RADIUS, SPACING } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useCartStore, useTheme } from "../store";

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface ProductCardProps {
  product: Product;
  style?: ViewStyle;
  horizontal?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  style,
  horizontal = false,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const { addToCart } = useCartStore();

  // Animations
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  const handleAddToCart = () => {
    addToCart(product, 1);

    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: 0.9,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      })
    ]).start();
  };

  const cardStyles = horizontal
    ? [
        styles.horizontalCard,
        {
          backgroundColor: colors.neutral[50],
          borderColor: colors.neutral[200],
        },
        style,
      ]
    : [
        styles.card,
        {
          backgroundColor: colors.neutral[50],
          borderColor: colors.neutral[200],
        },
        style,
      ];

  const renderDiscountBadge = () => {
    if (product.discountPrice) {
      const discountPercentage = Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      );
      return (
        <View style={[styles.discountBadge, { backgroundColor: colors.error }]}>
          <Text style={styles.discountText}>{discountPercentage}% تخفیف</Text>
        </View>
      );
    }
    return null;
  };

  if (horizontal) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            cardStyles,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require("../../assets/non.jpg")}
            style={styles.horizontalImage}
            resizeMode="cover"
          />
          <View style={styles.horizontalContent}>
            <View>
              <Text
                style={[styles.category, { color: colors.neutral[500] }]}
                numberOfLines={1}
              >
                {product.category.name}
              </Text>
              <Text
                style={[styles.name, { color: colors.text }]}
                numberOfLines={2}
              >
                {product.name}
              </Text>
            </View>

            <View style={styles.horizontalBottom}>
              <View>
                {product.discountPrice ? (
                  <View style={styles.priceContainer}>
                    <Text
                      style={[
                        styles.discountPrice,
                        { color: colors.primary.DEFAULT },
                      ]}
                    >
                      {product.discountPrice.toLocaleString()} تومان
                    </Text>
                    <Text
                      style={[
                        styles.originalPrice,
                        { color: colors.neutral[400] },
                      ]}
                    >
                      {product.price.toLocaleString()}
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={[styles.price, { color: colors.primary.DEFAULT }]}
                  >
                    {product.price.toLocaleString()} تومان
                  </Text>
                )}
              </View>

              <Animated.View
                style={{
                  transform: [{ scale: buttonScaleAnim }],
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    { backgroundColor: colors.primary.DEFAULT },
                  ]}
                  onPress={handleAddToCart}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          cardStyles,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/gosh.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          {renderDiscountBadge()}
          {!product.inStock && (
            <View
              style={[
                styles.outOfStockOverlay,
                { backgroundColor: "rgba(0, 0, 0, 0.6)" },
              ]}
            >
              <Text style={styles.outOfStockText}>ناموجود</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text
            style={[styles.category, { color: colors.neutral[500] }]}
            numberOfLines={1}
          >
            {product.category.name}
          </Text>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
            {product.name}
          </Text>

          <View style={styles.bottom}>
            <View>
              {product.discountPrice ? (
                <View style={styles.priceContainer}>
                  <Text
                    style={[
                      styles.discountPrice,
                      { color: colors.primary.DEFAULT },
                    ]}
                  >
                    {product.discountPrice.toLocaleString()} تومان
                  </Text>
                  <Text
                    style={[
                      styles.originalPrice,
                      { color: colors.neutral[400] },
                    ]}
                  >
                    {product.price.toLocaleString()}
                  </Text>
                </View>
              ) : (
                <Text style={[styles.price, { color: colors.primary.DEFAULT }]}>
                  {product.price.toLocaleString()} تومان
                </Text>
              )}
            </View>

            <Animated.View
              style={{
                transform: [{ scale: buttonScaleAnim }],
              }}
            >
              <TouchableOpacity
                style={[
                  styles.addButton,
                  {
                    backgroundColor: product.inStock
                      ? colors.primary.DEFAULT
                      : colors.neutral[300],
                  },
                ]}
                onPress={handleAddToCart}
                activeOpacity={0.8}
                disabled={!product.inStock}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  horizontalCard: {
    flexDirection: "row",
    width: "100%",
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    height: 140,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  horizontalImage: {
    width: 100,
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZE.xs,
    fontWeight: "bold",
  },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  outOfStockText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZE.md,
    fontWeight: "bold",
  },
  content: {
    padding: SPACING.sm,
  },
  horizontalContent: {
    flex: 1,
    padding: SPACING.sm,
    justifyContent: "space-between",
  },
  category: {
    fontSize: FONT_SIZE.xs,
    marginBottom: 4,
  },
  name: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    marginBottom: 8,
    height: 40,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  horizontalBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "column",
  },
  price: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
  },
  discountPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
  },
  originalPrice: {
    fontSize: FONT_SIZE.sm,
    textDecorationLine: "line-through",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCard;
