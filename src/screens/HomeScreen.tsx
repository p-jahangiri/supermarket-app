import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  I18nManager,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { ProductCard, CategoryCard } from "../components";
import PromoBanner from "../components/PromoBanner";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useProductStore, useTheme, useCartStore } from "../store";
import { RootStackParamList } from "../types";

// تنظیم راست به چپ بودن اپلیکیشن
I18nManager.forceRTL(true);

const { width } = Dimensions.get("window");

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    products,
    categories,
    featuredProducts,
    isLoading,
    error,
    fetchProducts,
    fetchCategories,
    fetchFeaturedProducts,
  } = useProductStore();
  const { cart } = useCartStore();
  const { colors, isDark } = useTheme();

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Fetch data when component mounts
    fetchProducts();
    fetchCategories();
    fetchFeaturedProducts();

    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  const handleSearch = () => {
    navigation.navigate("Search");
  };

  const handleSeeAllCategories = () => {
    navigation.navigate("Categories");
  };

  const handleSeeAllProducts = () => {
    if (categories.length > 0) {
      navigation.navigate("CategoryProducts", {
        categoryId: categories[0].id,
        categoryName: categories[0].name,
      });
    }
  };

  const handleBannerPress = () => {
    if (featuredProducts.length > 0) {
      navigation.navigate("ProductDetails", {
        productId: featuredProducts[0].id,
      });
    }
  };

  if (isLoading && products.length === 0) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary.DEFAULT} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          {STRINGS.LOADING}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        <TouchableOpacity
          style={[
            styles.retryButton,
            { backgroundColor: colors.primary.DEFAULT },
          ]}
          onPress={() => {
            fetchProducts();
            fetchCategories();
            fetchFeaturedProducts();
          }}
        >
          <Text style={[styles.retryButtonText, { color: colors.neutral[50] }]}>
            {STRINGS.RETRY}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.greeting, { color: colors.neutral[600] }]}>
              {STRINGS.WELCOME}
            </Text>
            <Text style={[styles.appName, { color: colors.text }]}>
              {STRINGS.APP_NAME}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.cartButton,
              { backgroundColor: colors.primary.DEFAULT + "20" },
            ]}
            onPress={() => navigation.navigate("Cart")}
          >
            <Ionicons
              name="cart-outline"
              size={24}
              color={colors.primary.DEFAULT}
            />
            {cart.items.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.items.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: colors.neutral[100] }]}
          onPress={handleSearch}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.neutral[500]}
          />
          <Text
            style={[styles.searchPlaceholder, { color: colors.neutral[500] }]}
          >
            {STRINGS.SEARCH_PLACEHOLDER}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Featured Carousel */}
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <FeaturedCarousel products={featuredProducts} />
        </Animated.View>

        {/* Categories Section */}
        <Animated.View
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {STRINGS.CATEGORIES}
            </Text>
            <TouchableOpacity onPress={handleSeeAllCategories}>
              <Text
                style={[styles.seeAllText, { color: colors.primary.DEFAULT }]}
              >
                {STRINGS.SEE_ALL}
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={categories.slice(0, 6)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 50 + index * 10],
                      }),
                    },
                  ],
                }}
              >
                <CategoryCard category={item} size="medium" />
              </Animated.View>
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </Animated.View>

        {/* Special Offers Banner */}
        <PromoBanner
          title={STRINGS.SPECIAL_OFFERS}
          subtitle={STRINGS.SPECIAL_OFFERS_SUBTITLE}
          buttonText={STRINGS.SHOP_NOW}
          imageUrl="https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=1472&auto=format&fit=crop"
          onPress={handleBannerPress}
          style={{ marginHorizontal: SPACING.md, marginBottom: SPACING.lg }}
        />

        {/* New Arrivals Section */}
        <Animated.View
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {STRINGS.NEW_ARRIVALS}
            </Text>
            <TouchableOpacity onPress={handleSeeAllProducts}>
              <Text
                style={[styles.seeAllText, { color: colors.primary.DEFAULT }]}
              >
                {STRINGS.SEE_ALL}
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={products.slice(0, 6)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Animated.View
                style={[
                  styles.productCardContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 30 + index * 10],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <ProductCard product={item} />
              </Animated.View>
            )}
            contentContainerStyle={styles.productsList}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZE.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  retryButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  retryButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  greeting: {
    fontSize: FONT_SIZE.sm,
    marginBottom: 4,
  },
  appName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: FONT_SIZE.xs,
    fontWeight: "bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  searchPlaceholder: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZE.md,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  sectionContainer: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
  },
  seeAllText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
  categoriesList: {
    paddingHorizontal: SPACING.md,
  },
  productsList: {
    paddingHorizontal: SPACING.md,
  },
  productCardContainer: {
    marginRight: SPACING.sm,
  },
});

export default HomeScreen;
