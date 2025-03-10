import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useProductStore, useTheme } from "../store";
import { ProductCard } from "../components";
import { RootStackParamList } from "../types";

type CategoryProductsRouteProp = RouteProp<
  RootStackParamList,
  "CategoryProducts"
>;

const CategoryProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<CategoryProductsRouteProp>();
  const { categoryId } = route.params;
  const { getProductsByCategory, categories, isLoading, error } =
    useProductStore();
  const { colors } = useTheme();

  const [sortBy, setSortBy] = useState<
    "default" | "price_asc" | "price_desc" | "rating"
  >("default");
  const [showSortOptions, setShowSortOptions] = useState(false);

  const category = categories.find((c) => c.id === categoryId);
  const products = getProductsByCategory(categoryId);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price_asc":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price_desc":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  if (isLoading) {
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

  if (error || !category) {
    return (
      <View
        style={[styles.errorContainer, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.errorText, { color: colors.error }]}>
          {error || "دسته‌بندی یافت نشد"}
        </Text>
        <TouchableOpacity
          style={[
            styles.retryButton,
            { backgroundColor: colors.primary.DEFAULT },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.retryButtonText, { color: colors.neutral[50] }]}>
            بازگشت
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getSortLabel = () => {
    switch (sortBy) {
      case "price_asc":
        return "قیمت: کم به زیاد";
      case "price_desc":
        return "قیمت: زیاد به کم";
      case "rating":
        return "امتیاز";
      default:
        return "پیش‌فرض";
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={[styles.header, { borderBottomColor: colors.neutral[200] }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.neutral[100] }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.neutral[700]} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {category.name}
        </Text>

        <TouchableOpacity
          style={[styles.cartButton, { backgroundColor: colors.neutral[100] }]}
          onPress={() => navigation.navigate("Cart" as never)}
        >
          <Ionicons
            name="cart-outline"
            size={24}
            color={colors.primary.DEFAULT}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.resultsCount}>
          <Text style={[styles.resultsText, { color: colors.neutral[600] }]}>
            {products.length} محصول
          </Text>
        </View>

        <View style={styles.sortContainer}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              { backgroundColor: colors.neutral[100] },
            ]}
            onPress={() => setShowSortOptions(!showSortOptions)}
          >
            <Ionicons
              name="filter-outline"
              size={20}
              color={colors.neutral[700]}
            />
            <Text
              style={[styles.sortButtonText, { color: colors.neutral[700] }]}
            >
              مرتب‌سازی: {getSortLabel()}
            </Text>
            <Ionicons
              name={showSortOptions ? "chevron-up" : "chevron-down"}
              size={20}
              color={colors.neutral[700]}
            />
          </TouchableOpacity>

          {showSortOptions && (
            <View
              style={[
                styles.sortOptions,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.neutral[200],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortBy === "default" && {
                    backgroundColor: colors.neutral[100],
                  },
                ]}
                onPress={() => {
                  setSortBy("default");
                  setShowSortOptions(false);
                }}
              >
                <Text style={[styles.sortOptionText, { color: colors.text }]}>
                  پیش‌فرض
                </Text>
                {sortBy === "default" && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={colors.primary.DEFAULT}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortBy === "price_asc" && {
                    backgroundColor: colors.neutral[100],
                  },
                ]}
                onPress={() => {
                  setSortBy("price_asc");
                  setShowSortOptions(false);
                }}
              >
                <Text style={[styles.sortOptionText, { color: colors.text }]}>
                  قیمت: کم به زیاد
                </Text>
                {sortBy === "price_asc" && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={colors.primary.DEFAULT}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortBy === "price_desc" && {
                    backgroundColor: colors.neutral[100],
                  },
                ]}
                onPress={() => {
                  setSortBy("price_desc");
                  setShowSortOptions(false);
                }}
              >
                <Text style={[styles.sortOptionText, { color: colors.text }]}>
                  قیمت: زیاد به کم
                </Text>
                {sortBy === "price_desc" && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={colors.primary.DEFAULT}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sortOption,
                  sortBy === "rating" && {
                    backgroundColor: colors.neutral[100],
                  },
                ]}
                onPress={() => {
                  setSortBy("rating");
                  setShowSortOptions(false);
                }}
              >
                <Text style={[styles.sortOptionText, { color: colors.text }]}>
                  امتیاز
                </Text>
                {sortBy === "rating" && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={colors.primary.DEFAULT}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {sortedProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="basket-outline"
            size={64}
            color={colors.neutral[300]}
          />
          <Text style={[styles.emptyText, { color: colors.neutral[700] }]}>
            محصولی در این دسته‌بندی یافت نشد
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedProducts}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <ProductCard product={item} />
            </View>
          )}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsCount: {
    flex: 1,
  },
  resultsText: {
    fontSize: FONT_SIZE.sm,
  },
  sortContainer: {
    position: "relative",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sortButtonText: {
    fontSize: FONT_SIZE.sm,
    marginHorizontal: 8,
  },
  sortOptions: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 200,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sortOptionText: {
    fontSize: FONT_SIZE.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    marginTop: 16,
  },
  productsList: {
    padding: 8,
  },
  productContainer: {
    width: "50%",
    padding: 8,
  },
});

export default CategoryProductsScreen;
