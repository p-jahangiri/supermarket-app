import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Dimensions,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../constants/theme";
import { Product, RootStackParamList } from "../types";
import { useTheme } from "../store";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - SPACING.md * 2;

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface FeaturedCarouselProps {
  products: Product[];
  style?: ViewStyle;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  products,
  style,
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const { colors } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay && products.length > 1) {
      interval = setInterval(() => {
        if (flatListRef.current) {
          const nextSlide = (activeSlide + 1) % products.length;
          flatListRef.current.scrollToIndex({
            index: nextSlide,
            animated: true,
          });
          setActiveSlide(nextSlide);
        }
      }, autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSlide, products.length, autoPlay, autoPlayInterval]);

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [ITEM_WIDTH * 0.15, 0, -ITEM_WIDTH * 0.15],
      extrapolate: "clamp",
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [20, 0, 20],
      extrapolate: "clamp",
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.7, 1, 0.7],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("ProductDetails", { productId: item.id })
        }
      >
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{ scale }, { translateX }, { translateY }],
              opacity,
            },
          ]}
        >
          <ImageBackground
            source={require("../../assets/hob.jpg")}
            style={styles.image}
            imageStyle={{ borderRadius: BORDER_RADIUS.lg }}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.7)"]}
              style={styles.gradient}
            >
              <View style={styles.content}>
                <Text style={styles.category} numberOfLines={1}>
                  {item.category.name}
                </Text>
                <Text style={styles.title} numberOfLines={2}>
                  {item.name}
                </Text>
                <View style={styles.priceContainer}>
                  {item.discountPrice ? (
                    <>
                      <Text style={styles.discountPrice}>
                        {item.discountPrice.toLocaleString()} تومان
                      </Text>
                      <Text style={styles.originalPrice}>
                        {item.price.toLocaleString()} تومان
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.price}>
                      {item.price.toLocaleString()} تومان
                    </Text>
                  )}
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderDotIndicator = () => {
    return (
      <View style={styles.paginationContainer}>
        {products.map((_, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                  backgroundColor: colors.primary.DEFAULT,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        ref={flatListRef}
        data={products}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const slideIndex = Math.round(
            event.nativeEvent.contentOffset.x / ITEM_WIDTH
          );
          setActiveSlide(slideIndex);
        }}
        contentContainerStyle={styles.list}
      />
      {products.length > 1 && renderDotIndicator()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  list: {
    paddingHorizontal: SPACING.md,
  },
  item: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: SPACING.md,
  },
  content: {
    justifyContent: "flex-end",
  },
  category: {
    color: "rgba(255,255,255,0.8)",
    fontSize: FONT_SIZE.sm,
    marginBottom: 4,
  },
  title: {
    color: "white",
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
  },
  discountPrice: {
    color: "white",
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    marginRight: SPACING.sm,
  },
  originalPrice: {
    color: "rgba(255,255,255,0.7)",
    fontSize: FONT_SIZE.sm,
    textDecorationLine: "line-through",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default FeaturedCarousel;
