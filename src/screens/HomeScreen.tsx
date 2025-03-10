import React, { useEffect } from "react";
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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ProductCard, CategoryCard } from "../components";
import { FONT_SIZE, SPACING } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useProductStore, useTheme } from "../store";

// تنظیم راست به چپ بودن اپلیکیشن
I18nManager.forceRTL(true);

const HomeScreen = () => {
  const navigation = useNavigation();
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

  const { colors } = useTheme();

  useEffect(() => {
    // Fetch data when component mounts
    fetchProducts();
    fetchCategories();
    fetchFeaturedProducts();
  }, []);

  const handleSearch = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Search");
  };

  const handleSeeAllCategories = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Categories");
  };

  const handleSeeAllProducts = () => {
    // We can navigate to a specific category or all products
    // For now, let's just go to the first category
    if (categories.length > 0) {
      // @ts-ignore - We'll fix the navigation types later
      navigation.navigate("CategoryProducts", { categoryId: categories[0].id });
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
        <Text style={[styles.loadingText, { color: colors.neutral[700] }]}>
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.greeting, { color: colors.neutral[600] }]}>
              {STRINGS.WELCOME}
            </Text>
            <Text style={[styles.appName, { color: colors.neutral[900] }]}>
              {STRINGS.APP_NAME}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.cartButton,
              { backgroundColor: colors.neutral[100] },
            ]}
            onPress={() => navigation.navigate("Cart")}
          >
            <Ionicons
              name="cart-outline"
              size={24}
              color={colors.primary.DEFAULT}
            />
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
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.neutral[900] }]}>
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
            renderItem={({ item }) => (
              <CategoryCard category={item} size="small" />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Products Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.neutral[900] }]}>
              {STRINGS.FEATURED_PRODUCTS}
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
            data={featuredProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productCardContainer}>
                <ProductCard product={item} />
              </View>
            )}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* New Arrivals Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.neutral[900] }]}>
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
            data={products.slice(0, 4)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.productCardContainer}>
                <ProductCard product={item} />
              </View>
            )}
            contentContainerStyle={styles.productsList}
          />
        </View>

        {/* Special Offers Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0?q=80&w=1472&auto=format&fit=crop",
            }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>{STRINGS.SPECIAL_OFFERS}</Text>
            <Text style={styles.bannerSubtitle}>
              {STRINGS.SPECIAL_OFFERS_SUBTITLE}
            </Text>
            <TouchableOpacity
              style={[
                styles.bannerButton,
                { backgroundColor: colors.primary.DEFAULT },
              ]}
              onPress={handleSeeAllProducts}
            >
              <Text style={styles.bannerButtonText}>{STRINGS.SHOP_NOW}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 12,
    fontSize: FONT_SIZE.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: {
    fontSize: FONT_SIZE.md,
  },
  appName: {
    fontSize: FONT_SIZE["2xl"],
    fontWeight: "bold",
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontSize: FONT_SIZE.md,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
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
    paddingHorizontal: 8,
  },
  productsList: {
    paddingHorizontal: 8,
  },
  productCardContainer: {
    marginHorizontal: 8,
  },
  bannerContainer: {
    marginTop: 24,
    marginHorizontal: 16,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  bannerTitle: {
    fontSize: FONT_SIZE["2xl"],
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: FONT_SIZE.md,
    color: "#F3F4F6",
    marginBottom: 16,
  },
  bannerButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
});

export default HomeScreen;
