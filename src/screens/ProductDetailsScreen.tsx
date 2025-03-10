import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useProductStore, useCartStore, useTheme } from "../store";
import { ProductCard } from "../components";
import { RootStackParamList } from "../types";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const { width } = Dimensions.get("window");

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const { getProductById, products } = useProductStore();
  const { addToCart } = useCartStore();
  const { colors } = useTheme();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const product = getProductById(productId);

  // Get related products (same category)
  const relatedProducts = products
    .filter(
      (p) => p.category.id === product?.category.id && p.id !== product?.id
    )
    .slice(0, 4);

  if (!product) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: colors.neutral[100] },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
          </TouchableOpacity>
        </View>
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundText, { color: colors.neutral[700] }]}>
            محصول یافت نشد
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show a toast or feedback
  };

  const handleQuantityChange = (value: number) => {
    if (quantity + value > 0) {
      setQuantity(quantity + value);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.neutral[100] }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cartButton, { backgroundColor: colors.neutral[100] }]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons
            name="cart-outline"
            size={24}
            color={colors.primary.DEFAULT}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images Carousel */}
        <View style={styles.imageCarouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setActiveImageIndex(newIndex);
            }}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.productImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* Image Indicators */}
          {product.images.length > 1 && (
            <View style={styles.indicatorsContainer}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        index === activeImageIndex
                          ? colors.primary.DEFAULT
                          : colors.neutral[300],
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* Product Info */}
        <View
          style={[
            styles.productInfoContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <View style={styles.categoryAndRating}>
            <Text style={[styles.categoryText, { color: colors.neutral[500] }]}>
              {product.category.name}
            </Text>

            {product.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={colors.accent.DEFAULT} />
                <Text
                  style={[styles.ratingText, { color: colors.neutral[700] }]}
                >
                  {product.rating.toFixed(1)}
                </Text>
              </View>
            )}
          </View>

          <Text style={[styles.productName, { color: colors.text }]}>
            {product.name}
          </Text>

          <View style={styles.priceAndStock}>
            <View style={styles.priceContainer}>
              {product.discountPrice ? (
                <>
                  <Text
                    style={[
                      styles.discountPrice,
                      { color: colors.primary.DEFAULT },
                    ]}
                  >
                    {product.discountPrice.toFixed(0)} تومان
                  </Text>
                  <Text
                    style={[
                      styles.originalPrice,
                      { color: colors.neutral[500] },
                    ]}
                  >
                    {product.price.toFixed(0)} تومان
                  </Text>
                </>
              ) : (
                <Text style={[styles.price, { color: colors.text }]}>
                  {product.price.toFixed(0)} تومان
                </Text>
              )}
            </View>

            <View
              style={[
                styles.stockBadge,
                {
                  backgroundColor: product.inStock
                    ? colors.success + "20"
                    : colors.error + "20",
                },
              ]}
            >
              <Text
                style={[
                  styles.stockText,
                  {
                    color: product.inStock ? colors.success : colors.error,
                  },
                ]}
              >
                {product.inStock ? STRINGS.IN_STOCK : STRINGS.OUT_OF_STOCK}
              </Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "description" && [
                  styles.activeTab,
                  { borderBottomColor: colors.primary.DEFAULT },
                ],
              ]}
              onPress={() => setActiveTab("description")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "description" && [
                    styles.activeTabText,
                    { color: colors.primary.DEFAULT },
                  ],
                  {
                    color:
                      activeTab === "description"
                        ? colors.primary.DEFAULT
                        : colors.neutral[600],
                  },
                ]}
              >
                {STRINGS.DESCRIPTION}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "reviews" && [
                  styles.activeTab,
                  { borderBottomColor: colors.primary.DEFAULT },
                ],
              ]}
              onPress={() => setActiveTab("reviews")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "reviews" && [
                    styles.activeTabText,
                    { color: colors.primary.DEFAULT },
                  ],
                  {
                    color:
                      activeTab === "reviews"
                        ? colors.primary.DEFAULT
                        : colors.neutral[600],
                  },
                ]}
              >
                {STRINGS.REVIEWS}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === "description" ? (
              <Text
                style={[styles.descriptionText, { color: colors.neutral[700] }]}
              >
                {product.description}
              </Text>
            ) : (
              <View style={styles.reviewsContainer}>
                {product.reviews && product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <View
                      key={review.id}
                      style={[
                        styles.reviewItem,
                        index < product.reviews!.length - 1 && [
                          styles.reviewDivider,
                          { borderBottomColor: colors.neutral[200] },
                        ],
                      ]}
                    >
                      <View style={styles.reviewHeader}>
                        <Text
                          style={[styles.reviewerName, { color: colors.text }]}
                        >
                          {review.userName}
                        </Text>
                        <View style={styles.reviewRating}>
                          <Ionicons
                            name="star"
                            size={14}
                            color={colors.accent.DEFAULT}
                          />
                          <Text
                            style={[
                              styles.reviewRatingText,
                              { color: colors.neutral[700] },
                            ]}
                          >
                            {review.rating.toFixed(1)}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.reviewDate,
                          { color: colors.neutral[500] },
                        ]}
                      >
                        {new Date(review.date).toLocaleDateString("fa-IR")}
                      </Text>
                      <Text
                        style={[
                          styles.reviewComment,
                          { color: colors.neutral[700] },
                        ]}
                      >
                        {review.comment}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text
                    style={[
                      styles.noReviewsText,
                      { color: colors.neutral[500] },
                    ]}
                  >
                    هنوز نظری برای این محصول ثبت نشده است.
                  </Text>
                )}
              </View>
            )}
          </View>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <View style={styles.relatedProductsContainer}>
              <Text
                style={[styles.relatedProductsTitle, { color: colors.text }]}
              >
                {STRINGS.RELATED_PRODUCTS}
              </Text>

              <FlatList
                data={relatedProducts}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.relatedProductItem}>
                    <ProductCard product={item} />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.neutral[200],
          },
        ]}
      >
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            style={[
              styles.quantityButton,
              { backgroundColor: colors.neutral[200] },
            ]}
            onPress={() => handleQuantityChange(-1)}
          >
            <Ionicons name="remove" size={20} color={colors.neutral[700]} />
          </TouchableOpacity>

          <Text style={[styles.quantityText, { color: colors.text }]}>
            {quantity}
          </Text>

          <TouchableOpacity
            style={[
              styles.quantityButton,
              { backgroundColor: colors.neutral[200] },
            ]}
            onPress={() => handleQuantityChange(1)}
          >
            <Ionicons name="add" size={20} color={colors.neutral[700]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            {
              backgroundColor: product.inStock
                ? colors.primary.DEFAULT
                : colors.neutral[400],
            },
          ]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <Text style={styles.addToCartButtonText}>{STRINGS.ADD_TO_CART}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
  },
  imageCarouselContainer: {
    width: width,
    height: width * 0.8,
  },
  productImage: {
    width: width,
    height: width * 0.8,
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 16,
    width: "100%",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  productInfoContainer: {
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  categoryAndRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: FONT_SIZE.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: FONT_SIZE.sm,
    marginLeft: 4,
  },
  productName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    marginBottom: 12,
  },
  priceAndStock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
  },
  discountPrice: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: FONT_SIZE.md,
    textDecorationLine: "line-through",
  },
  stockBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  stockText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: "600",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  activeTabText: {
    fontWeight: "700",
  },
  tabContent: {
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: FONT_SIZE.md,
    lineHeight: 24,
  },
  reviewsContainer: {
    marginTop: 8,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
  },
  reviewDivider: {
    borderBottomWidth: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  reviewRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewRatingText: {
    fontSize: FONT_SIZE.sm,
    marginLeft: 4,
  },
  reviewDate: {
    fontSize: FONT_SIZE.xs,
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
  },
  noReviewsText: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    marginVertical: 16,
  },
  relatedProductsContainer: {
    marginTop: 16,
  },
  relatedProductsTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    marginBottom: 16,
  },
  relatedProductItem: {
    marginRight: 16,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
    marginHorizontal: 12,
  },
  addToCartButton: {
    flex: 1,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
});

export default ProductDetailsScreen;
