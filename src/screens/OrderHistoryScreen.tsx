import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useUserStore, useTheme } from "../store";
import { Order, OrderStatus, RootStackParamList } from "../types";
import { MOCK_ORDERS } from "../constants/mockData";

const { width } = Dimensions.get("window");

type NavigationProp = StackNavigationProp<RootStackParamList>;

const OrderHistoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useUserStore();
  const { colors } = useTheme();

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  // Animation for tab indicator
  const [indicatorPosition] = useState(new Animated.Value(0));
  const [indicatorWidth] = useState(new Animated.Value(0));

  // References to tab buttons for measuring
  const tabRefs = React.useRef<{ [key: string]: { x: number; width: number } }>(
    {}
  );

  useEffect(() => {
    // Fetch orders (using mock data for now)
    setOrders(MOCK_ORDERS);

    // Start entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  const handleOrderPress = (orderId: string) => {
    navigation.navigate("OrderDetails", { orderId });
  };

  const filterOrdersByStatus = (status: string | null) => {
    setSelectedStatus(status);

    // Animate the tab indicator
    if (status !== null && tabRefs.current[status]) {
      const { x, width } = tabRefs.current[status];
      Animated.parallel([
        Animated.timing(indicatorPosition, {
          toValue: x,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(indicatorWidth, {
          toValue: width,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    }
  };

  const getFilteredOrders = () => {
    if (!selectedStatus) return orders;
    return orders.filter((order) => order.status === selectedStatus);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return colors.warning;
      case OrderStatus.PROCESSING:
        return colors.info;
      case OrderStatus.SHIPPED:
        return colors.primary.DEFAULT;
      case OrderStatus.DELIVERED:
        return colors.success;
      case OrderStatus.CANCELLED:
        return colors.error;
      default:
        return colors.neutral[500];
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return STRINGS.STATUS_PENDING;
      case OrderStatus.PROCESSING:
        return STRINGS.STATUS_PROCESSING;
      case OrderStatus.SHIPPED:
        return STRINGS.STATUS_SHIPPED;
      case OrderStatus.DELIVERED:
        return STRINGS.STATUS_DELIVERED;
      case OrderStatus.CANCELLED:
        return STRINGS.STATUS_CANCELLED;
      default:
        return status;
    }
  };

  const measureTab = (status: string | null, x: number, width: number) => {
    if (status !== null) {
      tabRefs.current[status] = { x, width };

      // Initialize indicator position for the first tab (All)
      if (status === null && !selectedStatus) {
        indicatorPosition.setValue(x);
        indicatorWidth.setValue(width);
      }
    }
  };

  const renderOrderItem = ({ item, index }: { item: Order; index: number }) => {
    // Calculate animation delay based on index
    const animationDelay = 100 + index * 100;

    // Create animated values for this specific item
    const itemFadeAnim = useRef(new Animated.Value(0)).current;
    const itemSlideAnim = useRef(new Animated.Value(50)).current;

    // Start animation when component mounts
    useEffect(() => {
      Animated.parallel([
        Animated.timing(itemFadeAnim, {
          toValue: 1,
          duration: 500,
          delay: animationDelay,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.timing(itemSlideAnim, {
          toValue: 0,
          duration: 500,
          delay: animationDelay,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.orderItem,
          {
            backgroundColor: colors.neutral[50],
            opacity: itemFadeAnim,
            transform: [{ translateY: itemSlideAnim }],
          },
        ]}
      >
        <View style={styles.orderHeader}>
          <View>
            <Text style={[styles.orderId, { color: colors.text }]}>
              #{item.id}
            </Text>
            <Text style={[styles.orderDate, { color: colors.neutral[500] }]}>
              {new Date(item.createdAt).toLocaleDateString("fa-IR")}
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) + "20" },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          {item.items.slice(0, 2).map((orderItem) => (
            <View
              key={orderItem.product.id}
              style={[
                styles.productItem,
                { borderBottomColor: colors.neutral[200] },
              ]}
            >
              <Image
                source={{ uri: orderItem.product.images[0] }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text
                  style={[styles.productName, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {orderItem.product.name}
                </Text>
                <Text
                  style={[
                    styles.productQuantity,
                    { color: colors.neutral[600] },
                  ]}
                >
                  {orderItem.quantity} × {orderItem.product.unit}
                </Text>
              </View>
            </View>
          ))}

          {item.items.length > 2 && (
            <Text style={[styles.moreItems, { color: colors.neutral[600] }]}>
              +{item.items.length - 2} {STRINGS.MORE} {STRINGS.ITEMS}
            </Text>
          )}
        </View>

        <View style={styles.orderFooter}>
          <View>
            <Text style={[styles.totalLabel, { color: colors.neutral[600] }]}>
              {STRINGS.TOTAL}
            </Text>
            <Text
              style={[styles.totalAmount, { color: colors.primary.DEFAULT }]}
            >
              {item.totalAmount.toFixed(0)} تومان
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.viewDetailsButton,
              { backgroundColor: colors.secondary.DEFAULT },
            ]}
            onPress={() =>
              navigation.navigate("OrderDetails", { orderId: item.id })
            }
          >
            <Text
              style={[styles.viewDetailsText, { color: colors.neutral[50] }]}
            >
              {STRINGS.VIEW_DETAILS}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
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
          {STRINGS.ORDER_HISTORY_TITLE}
        </Text>

        <View style={styles.placeholder} />
      </View>

      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity
            style={styles.filterTab}
            onPress={() => filterOrdersByStatus(null)}
            onLayout={(event) => {
              const { x, width } = event.nativeEvent.layout;
              measureTab(null, x, width);
            }}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    selectedStatus === null
                      ? colors.primary.DEFAULT
                      : colors.neutral[600],
                },
              ]}
            >
              {STRINGS.ALL}
            </Text>
          </TouchableOpacity>

          {Object.values(OrderStatus).map((status) => (
            <TouchableOpacity
              key={status}
              style={styles.filterTab}
              onPress={() => filterOrdersByStatus(status)}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                measureTab(status, x, width);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color:
                      selectedStatus === status
                        ? colors.primary.DEFAULT
                        : colors.neutral[600],
                  },
                ]}
              >
                {getStatusText(status)}
              </Text>
            </TouchableOpacity>
          ))}

          <Animated.View
            style={[
              styles.tabIndicator,
              {
                backgroundColor: colors.primary.DEFAULT,
                left: indicatorPosition,
                width: indicatorWidth,
              },
            ]}
          />
        </ScrollView>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {getFilteredOrders().length > 0 ? (
          <FlatList
            data={getFilteredOrders()}
            keyExtractor={(item) => item.id}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.ordersList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="receipt-outline"
              size={80}
              color={colors.neutral[300]}
            />
            <Text style={[styles.emptyText, { color: colors.neutral[700] }]}>
              {STRINGS.NO_ORDERS}
            </Text>
          </View>
        )}
      </Animated.View>
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
  placeholder: {
    width: 40,
  },
  filterContainer: {
    position: "relative",
    paddingVertical: 12,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  content: {
    flex: 1,
  },
  ordersList: {
    padding: 16,
  },
  orderItem: {
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: FONT_SIZE.sm,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: "600",
  },
  orderItems: {
    marginBottom: 16,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: FONT_SIZE.sm,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: FONT_SIZE.sm,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  viewDetailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.md,
  },
  viewDetailsText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
  },
  moreItems: {
    fontSize: FONT_SIZE.sm,
    color: useTheme().colors.neutral[600],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
});

export default OrderHistoryScreen;
