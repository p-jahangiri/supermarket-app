import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useProductStore, useTheme } from "../store";
import { ProductCard } from "../components";

const SearchScreen = () => {
  const navigation = useNavigation();
  const { searchProducts, isLoading } = useProductStore();
  const { colors } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Load recent searches from storage
    // For now, we'll use a mock
    setRecentSearches(["سیب", "شیر", "نان", "برنج"]);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim().length > 0) {
      setIsSearching(true);
      // Add a small delay to avoid too many searches while typing
      const timer = setTimeout(() => {
        const results = searchProducts(query);
        setSearchResults(results);
        setIsSearching(false);

        // Add to recent searches if not already there
        if (query.trim() && !recentSearches.includes(query.trim())) {
          const updatedSearches = [query.trim(), ...recentSearches.slice(0, 4)];
          setRecentSearches(updatedSearches);
          // Save to storage in a real app
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRecentSearchPress = (search) => {
    setSearchQuery(search);
    handleSearch(search);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    // Clear from storage in a real app
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

        <View
          style={[
            styles.searchInputContainer,
            { backgroundColor: colors.neutral[100] },
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.neutral[500]}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder={STRINGS.SEARCH_PLACEHOLDER}
            placeholderTextColor={colors.neutral[500]}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.neutral[500]}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.DEFAULT} />
        </View>
      ) : searchQuery.length > 0 ? (
        searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
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
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons
              name="search-outline"
              size={64}
              color={colors.neutral[300]}
            />
            <Text
              style={[styles.noResultsText, { color: colors.neutral[700] }]}
            >
              نتیجه‌ای برای "{searchQuery}" یافت نشد
            </Text>
            <Text
              style={[styles.noResultsSubtext, { color: colors.neutral[500] }]}
            >
              لطفاً عبارت دیگری را جستجو کنید
            </Text>
          </View>
        )
      ) : (
        <View style={styles.recentSearchesContainer}>
          <View style={styles.recentSearchesHeader}>
            <Text style={[styles.recentSearchesTitle, { color: colors.text }]}>
              جستجوهای اخیر
            </Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={clearRecentSearches}>
                <Text
                  style={[styles.clearText, { color: colors.primary.DEFAULT }]}
                >
                  پاک کردن
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {recentSearches.length > 0 ? (
            <FlatList
              data={recentSearches}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.recentSearchItem,
                    { borderBottomColor: colors.neutral[200] },
                  ]}
                  onPress={() => handleRecentSearchPress(item)}
                >
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={colors.neutral[500]}
                  />
                  <Text
                    style={[styles.recentSearchText, { color: colors.text }]}
                  >
                    {item}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.neutral[400]}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text
              style={[
                styles.noRecentSearchesText,
                { color: colors.neutral[500] },
              ]}
            >
              هنوز جستجویی انجام نشده است
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    marginLeft: 8,
    marginRight: 8,
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productsList: {
    padding: 8,
  },
  productContainer: {
    width: "50%",
    padding: 8,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  noResultsSubtext: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
  },
  recentSearchesContainer: {
    flex: 1,
    padding: 16,
  },
  recentSearchesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  recentSearchesTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
  },
  clearText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  recentSearchText: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    marginLeft: 12,
  },
  noRecentSearchesText: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    marginTop: 24,
  },
});

export default SearchScreen;
