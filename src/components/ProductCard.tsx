import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../types";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useCartStore, useTheme } from "../store";

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
  const navigation = useNavigation();
  const { addToCart } = useCartStore();
  const { colors } = useTheme();

  const handlePress = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const discountPercentage = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        horizontal ? styles.horizontalContainer : styles.verticalContainer,
        { backgroundColor: colors.background, ...SHADOWS.small },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.discountPrice && (
          <View
            style={[styles.discountBadge, { backgroundColor: colors.error }]}
          >
            <Text style={[styles.discountText, { color: colors.neutral[50] }]}>
              {discountPercentage}% تخفیف
            </Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.categoryText, { color: colors.neutral[500] }]}>
          {product.category.name}
        </Text>
        <Text
          style={[styles.nameText, { color: colors.neutral[800] }]}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <View style={styles.priceContainer}>
          {product.discountPrice ? (
            <>
              <Text
                style={[
                  styles.discountPriceText,
                  { color: colors.primary.DEFAULT },
                ]}
              >
                {product.discountPrice.toFixed(0)} تومان
              </Text>
              <Text
                style={[
                  styles.originalPriceText,
                  { color: colors.neutral[500] },
                ]}
              >
                {product.price.toFixed(0)} تومان
              </Text>
            </>
          ) : (
            <Text style={[styles.priceText, { color: colors.neutral[900] }]}>
              {product.price.toFixed(0)} تومان
            </Text>
          )}
        </View>

        {product.rating && (
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText, { color: colors.accent.DEFAULT }]}>
              ★ {product.rating.toFixed(1)}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: colors.primary.DEFAULT },
          ]}
          onPress={handleAddToCart}
          activeOpacity={0.7}
        >
          <Text style={[styles.addButtonText, { color: colors.neutral[50] }]}>
            {STRINGS.ADD_TO_CART}
          </Text>
        </TouchableOpacity>
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
  },
  verticalContainer: {
    width: 180,
  },
  horizontalContainer: {
    flexDirection: "row",
    width: "100%",
    height: 130,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 130,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  discountText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: "700",
  },
  contentContainer: {
    padding: 12,
  },
  categoryText: {
    fontSize: FONT_SIZE.xs,
    marginBottom: 4,
  },
  nameText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  priceText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
  },
  discountPriceText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    marginRight: 8,
  },
  originalPriceText: {
    fontSize: FONT_SIZE.sm,
    textDecorationLine: "line-through",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
});

export default ProductCard;
