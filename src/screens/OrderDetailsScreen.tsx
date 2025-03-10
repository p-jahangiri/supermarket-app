import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation";
import { STRINGS } from "../constants/strings";
import { MOCK_ORDERS } from "../constants/mockData";
import { Order, OrderStatus } from "../types";
import { useTheme } from "../store";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../constants/theme";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";

type OrderDetailsRouteProp = RouteProp<RootStackParamList, "OrderDetails">;

const OrderDetailsScreen = () => {
  const route = useRoute<OrderDetailsRouteProp>();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { orderId } = route.params;
  const [order, setOrder] = useState<Order | null>(null);

  // Animated values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Tracking step animations
  const trackingStepAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Fetch order data
    const orderData = MOCK_ORDERS.find((o) => o.id === orderId);
    setOrder(orderData || null);

    // Start entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // If order exists, animate progress bar based on status
    if (orderData) {
      let progressValue = 0;
      switch (orderData.status) {
        case OrderStatus.PENDING:
          progressValue = 0.2;
          break;
        case OrderStatus.PROCESSING:
          progressValue = 0.4;
          break;
        case OrderStatus.SHIPPED:
          progressValue = 0.7;
          break;
        case OrderStatus.DELIVERED:
          progressValue = 1;
          break;
        case OrderStatus.CANCELLED:
          progressValue = 0.1;
          break;
      }

      // Animate progress bar
      Animated.timing(progressAnim, {
        toValue: progressValue,
        duration: 1000,
        delay: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.cubic),
      }).start();

      // Animate tracking steps sequentially
      if (orderData.status !== OrderStatus.CANCELLED) {
        const stepAnimations = [];
        const statuses = [
          OrderStatus.PENDING,
          OrderStatus.PROCESSING,
          OrderStatus.SHIPPED,
          OrderStatus.DELIVERED,
        ];

        // Determine which steps should be animated based on current status
        const currentStatusIndex = statuses.indexOf(orderData.status);

        for (let i = 0; i <= currentStatusIndex; i++) {
          stepAnimations.push(
            Animated.timing(trackingStepAnims[i], {
              toValue: 1,
              duration: 400,
              delay: 500 + i * 300, // Stagger the animations
              useNativeDriver: true,
              easing: Easing.out(Easing.cubic),
            })
          );
        }

        Animated.sequence(stepAnimations).start();
      }
    }
  }, [orderId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleReorder = () => {
    // Implement reorder functionality
    console.log("Reorder");
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

  const getTrackingStepIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "wallet-outline";
      case OrderStatus.PROCESSING:
        return "sync-outline";
      case OrderStatus.SHIPPED:
        return "car-outline";
      case OrderStatus.DELIVERED:
        return "checkmark-circle-outline";
      default:
        return "ellipse-outline";
    }
  };

  if (!order) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {STRINGS.ORDER_DETAILS}
          </Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.notFoundContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={64}
            color={colors.neutral[400]}
          />
          <Text style={[styles.notFoundText, { color: colors.text }]}>
            سفارش مورد نظر یافت نشد
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {STRINGS.ORDER_DETAILS}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Order Info Card */}
          <Card style={styles.card}>
            <View style={styles.orderInfoHeader}>
              <View>
                <Text style={[styles.orderId, { color: colors.text }]}>
                  #{order.id}
                </Text>
                <Text
                  style={[styles.orderDate, { color: colors.neutral[500] }]}
                >
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(order.status) + "20" },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(order.status) },
                  ]}
                >
                  {getStatusText(order.status)}
                </Text>
              </View>
            </View>

            {/* Progress Bar */}
            {order.status !== OrderStatus.CANCELLED && (
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBackground,
                    { backgroundColor: colors.neutral[200] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      backgroundColor: getStatusColor(order.status),
                      width: progressWidth,
                    },
                  ]}
                />
              </View>
            )}
          </Card>

          {/* Order Tracking */}
          {order.status !== OrderStatus.CANCELLED && (
            <Card style={styles.card}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                {STRINGS.ORDER_TRACKING}
              </Text>
              <View style={styles.trackingContainer}>
                {/* Tracking Steps */}
                {[
                  OrderStatus.PENDING,
                  OrderStatus.PROCESSING,
                  OrderStatus.SHIPPED,
                  OrderStatus.DELIVERED,
                ].map((status, index) => {
                  const isActive =
                    [
                      OrderStatus.PENDING,
                      OrderStatus.PROCESSING,
                      OrderStatus.SHIPPED,
                      OrderStatus.DELIVERED,
                    ].indexOf(order.status) >= index;

                  return (
                    <View key={status} style={styles.trackingStep}>
                      <Animated.View
                        style={[
                          styles.trackingIconContainer,
                          {
                            backgroundColor: isActive
                              ? getStatusColor(status) + "20"
                              : colors.neutral[200],
                            transform: [
                              {
                                scale: trackingStepAnims[index].interpolate({
                                  inputRange: [0, 0.5, 1],
                                  outputRange: [0, 1.2, 1],
                                }),
                              },
                            ],
                            opacity: trackingStepAnims[index],
                          },
                        ]}
                      >
                        <Ionicons
                          name={getTrackingStepIcon(status)}
                          size={24}
                          color={
                            isActive
                              ? getStatusColor(status)
                              : colors.neutral[400]
                          }
                        />
                      </Animated.View>
                      <Text
                        style={[
                          styles.trackingStepText,
                          {
                            color: isActive ? colors.text : colors.neutral[400],
                            fontWeight: isActive ? "600" : "400",
                          },
                        ]}
                      >
                        {getStatusText(status)}
                      </Text>
                    </View>
                  );
                })}

                {/* Connecting Lines */}
                <View
                  style={[
                    styles.trackingLine,
                    { backgroundColor: colors.neutral[200] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.trackingLineFill,
                    {
                      backgroundColor: colors.primary.DEFAULT,
                      width: progressWidth,
                    },
                  ]}
                />
              </View>
            </Card>
          )}

          {/* Order Items */}
          <Card style={styles.card}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {STRINGS.ORDER_ITEMS}
            </Text>
            {order.items.map((item, index) => (
              <View
                key={item.product.id}
                style={[
                  styles.orderItem,
                  index < order.items.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.neutral[200],
                  },
                ]}
              >
                <Image
                  source={{ uri: item.product.images[0] }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.productInfo}>
                  <Text
                    style={[styles.productName, { color: colors.text }]}
                    numberOfLines={2}
                  >
                    {item.product.name}
                  </Text>
                  <View style={styles.productDetails}>
                    <Text
                      style={[
                        styles.productQuantity,
                        { color: colors.neutral[600] },
                      ]}
                    >
                      {item.quantity} × {item.product.unit}
                    </Text>
                    <Text
                      style={[
                        styles.productPrice,
                        { color: colors.primary.DEFAULT },
                      ]}
                    >
                      {(item.product.price * item.quantity).toFixed(0)} تومان
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </Card>

          {/* Shipping Address */}
          <Card style={styles.card}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {STRINGS.SHIPPING_ADDRESS}
            </Text>
            <View style={styles.addressContainer}>
              <Ionicons
                name="location-outline"
                size={24}
                color={colors.primary.DEFAULT}
                style={styles.addressIcon}
              />
              <View style={styles.addressInfo}>
                <Text style={[styles.addressText, { color: colors.text }]}>
                  {order.shippingAddress.street}
                </Text>
                <Text
                  style={[
                    styles.addressDetails,
                    { color: colors.neutral[600] },
                  ]}
                >
                  {order.shippingAddress.city}، {order.shippingAddress.state}،{" "}
                  {order.shippingAddress.zipCode}
                </Text>
                <Text
                  style={[
                    styles.addressDetails,
                    { color: colors.neutral[600] },
                  ]}
                >
                  {order.shippingAddress.country}
                </Text>
              </View>
            </View>
          </Card>

          {/* Payment Method */}
          <Card style={styles.card}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {STRINGS.PAYMENT_METHOD}
            </Text>
            <View style={styles.paymentContainer}>
              <Ionicons
                name={
                  order.paymentMethod === "online_payment"
                    ? "card-outline"
                    : "cash-outline"
                }
                size={24}
                color={colors.primary.DEFAULT}
                style={styles.paymentIcon}
              />
              <Text style={[styles.paymentText, { color: colors.text }]}>
                {order.paymentMethod === "online_payment"
                  ? "پرداخت آنلاین"
                  : "پرداخت در محل"}
              </Text>
            </View>
          </Card>

          {/* Order Summary */}
          <Card style={styles.card}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {STRINGS.ORDER_SUMMARY}
            </Text>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, { color: colors.neutral[600] }]}
                >
                  {STRINGS.SUBTOTAL}
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  {(order.totalAmount - 15000).toFixed(0)} تومان
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text
                  style={[styles.summaryLabel, { color: colors.neutral[600] }]}
                >
                  {STRINGS.SHIPPING}
                </Text>
                <Text style={[styles.summaryValue, { color: colors.text }]}>
                  15,000 تومان
                </Text>
              </View>
              <View
                style={[
                  styles.divider,
                  { backgroundColor: colors.neutral[200] },
                ]}
              />
              <View style={styles.summaryRow}>
                <Text
                  style={[styles.totalLabel, { color: colors.neutral[800] }]}
                >
                  {STRINGS.TOTAL}
                </Text>
                <Text
                  style={[styles.totalValue, { color: colors.primary.DEFAULT }]}
                >
                  {order.totalAmount.toFixed(0)} تومان
                </Text>
              </View>
            </View>
          </Card>

          {/* Reorder Button (only for delivered orders) */}
          {order.status === OrderStatus.DELIVERED && (
            <Button
              title={STRINGS.REORDER}
              onPress={handleReorder}
              style={styles.reorderButton}
              leftIcon={
                <Ionicons
                  name="refresh-outline"
                  size={20}
                  color={colors.neutral[50]}
                />
              }
            />
          )}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
  },
  scrollContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  cardTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    marginBottom: SPACING.sm,
  },
  orderInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
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
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
  },
  progressContainer: {
    height: 6,
    borderRadius: BORDER_RADIUS.full,
    overflow: "hidden",
    marginTop: SPACING.sm,
  },
  progressBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  progressFill: {
    height: "100%",
    borderRadius: BORDER_RADIUS.full,
  },
  trackingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.sm,
    position: "relative",
    height: 100,
  },
  trackingStep: {
    alignItems: "center",
    width: (width - SPACING.md * 2 - SPACING.md * 2) / 4,
    zIndex: 2,
  },
  trackingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  trackingStepText: {
    fontSize: FONT_SIZE.xs,
    textAlign: "center",
  },
  trackingLine: {
    position: "absolute",
    top: 24,
    left: 24,
    right: 24,
    height: 2,
    zIndex: 1,
  },
  trackingLineFill: {
    position: "absolute",
    top: 24,
    left: 24,
    height: 2,
    zIndex: 1,
  },
  orderItem: {
    flexDirection: "row",
    paddingVertical: SPACING.sm,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
    marginBottom: SPACING.xs,
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productQuantity: {
    fontSize: FONT_SIZE.sm,
  },
  productPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  addressIcon: {
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
    marginBottom: 4,
  },
  addressDetails: {
    fontSize: FONT_SIZE.sm,
    marginBottom: 2,
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentIcon: {
    marginRight: SPACING.sm,
  },
  paymentText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
  },
  summaryContainer: {
    marginTop: SPACING.xs,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.md,
  },
  summaryValue: {
    fontSize: FONT_SIZE.md,
  },
  divider: {
    height: 1,
    marginVertical: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
  },
  reorderButton: {
    marginTop: SPACING.sm,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  notFoundText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "500",
    marginTop: SPACING.md,
    textAlign: "center",
  },
});

export default OrderDetailsScreen;
