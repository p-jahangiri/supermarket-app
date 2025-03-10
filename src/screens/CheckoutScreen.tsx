import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useCartStore, useUserStore, useTheme } from "../store";
import { PaymentMethod } from "../types";
import Button from "../components/ui/Button";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cart, clearCart } = useCartStore();
  const { user } = useUserStore();
  const { colors } = useTheme();

  const [selectedAddress, setSelectedAddress] = useState(user?.address || null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>(PaymentMethod.CASH_ON_DELIVERY);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      Alert.alert("خطا", "لطفاً آدرس ارسال را انتخاب کنید");
      return;
    }

    setIsLoading(true);

    // Simulate order placement
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      // Navigate to order success screen with a mock order ID
      navigation.navigate("OrderSuccess", { orderId: `ORD-${Date.now()}` });
    }, 2000);
  };

  const handleAddAddress = () => {
    // Navigate to add address screen
    // For now, we'll just show an alert
    Alert.alert("اضافه کردن آدرس", "این قابلیت در نسخه بعدی اضافه خواهد شد");
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
          {STRINGS.CHECKOUT}
        </Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Shipping Address Section */}
        <View
          style={[styles.section, { borderBottomColor: colors.neutral[200] }]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {STRINGS.SHIPPING_ADDRESS}
            </Text>
            <TouchableOpacity onPress={handleAddAddress}>
              <Text style={[styles.addText, { color: colors.primary.DEFAULT }]}>
                + افزودن آدرس جدید
              </Text>
            </TouchableOpacity>
          </View>

          {selectedAddress ? (
            <View
              style={[
                styles.addressCard,
                { backgroundColor: colors.neutral[50] },
              ]}
            >
              <View style={styles.addressHeader}>
                <Text style={[styles.addressName, { color: colors.text }]}>
                  {user?.name}
                </Text>
                <TouchableOpacity>
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color={colors.primary.DEFAULT}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={[styles.addressText, { color: colors.neutral[700] }]}
              >
                {selectedAddress.street}, {selectedAddress.city},{" "}
                {selectedAddress.state}
              </Text>
              <Text
                style={[styles.addressText, { color: colors.neutral[700] }]}
              >
                {selectedAddress.zipCode}, {selectedAddress.country}
              </Text>
              <Text
                style={[styles.addressText, { color: colors.neutral[700] }]}
              >
                {user?.phone || "شماره تلفن موجود نیست"}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[
                styles.addAddressButton,
                { borderColor: colors.primary.DEFAULT },
              ]}
              onPress={handleAddAddress}
            >
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={colors.primary.DEFAULT}
              />
              <Text
                style={[
                  styles.addAddressText,
                  { color: colors.primary.DEFAULT },
                ]}
              >
                افزودن آدرس ارسال
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Payment Method Section */}
        <View
          style={[styles.section, { borderBottomColor: colors.neutral[200] }]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {STRINGS.PAYMENT_METHOD}
          </Text>

          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethodCard,
                selectedPaymentMethod === PaymentMethod.CASH_ON_DELIVERY && [
                  styles.selectedPaymentMethod,
                  { borderColor: colors.primary.DEFAULT },
                ],
                { backgroundColor: colors.neutral[50] },
              ]}
              onPress={() =>
                setSelectedPaymentMethod(PaymentMethod.CASH_ON_DELIVERY)
              }
            >
              <View style={styles.paymentMethodContent}>
                <Ionicons
                  name="cash-outline"
                  size={24}
                  color={colors.neutral[700]}
                />
                <Text
                  style={[styles.paymentMethodText, { color: colors.text }]}
                >
                  پرداخت در محل
                </Text>
              </View>

              {selectedPaymentMethod === PaymentMethod.CASH_ON_DELIVERY && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary.DEFAULT}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethodCard,
                selectedPaymentMethod === PaymentMethod.ONLINE_PAYMENT && [
                  styles.selectedPaymentMethod,
                  { borderColor: colors.primary.DEFAULT },
                ],
                { backgroundColor: colors.neutral[50] },
              ]}
              onPress={() =>
                setSelectedPaymentMethod(PaymentMethod.ONLINE_PAYMENT)
              }
            >
              <View style={styles.paymentMethodContent}>
                <Ionicons
                  name="card-outline"
                  size={24}
                  color={colors.neutral[700]}
                />
                <Text
                  style={[styles.paymentMethodText, { color: colors.text }]}
                >
                  پرداخت آنلاین
                </Text>
              </View>

              {selectedPaymentMethod === PaymentMethod.ONLINE_PAYMENT && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={colors.primary.DEFAULT}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {STRINGS.ORDER_SUMMARY}
          </Text>

          <View style={styles.orderItems}>
            {cart.items.map((item) => (
              <View
                key={item.product.id}
                style={[
                  styles.orderItem,
                  { borderBottomColor: colors.neutral[200] },
                ]}
              >
                <View style={styles.orderItemInfo}>
                  <Text style={[styles.orderItemName, { color: colors.text }]}>
                    {item.product.name}
                  </Text>
                  <Text
                    style={[
                      styles.orderItemQuantity,
                      { color: colors.neutral[600] },
                    ]}
                  >
                    {item.quantity} × {item.product.unit}
                  </Text>
                </View>
                <Text style={[styles.orderItemPrice, { color: colors.text }]}>
                  {(
                    (item.product.discountPrice || item.product.price) *
                    item.quantity
                  ).toFixed(0)}{" "}
                  تومان
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryLabel, { color: colors.neutral[600] }]}
              >
                {STRINGS.SUBTOTAL}
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {cart.totalAmount.toFixed(0)} تومان
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryLabel, { color: colors.neutral[600] }]}
              >
                {STRINGS.SHIPPING}
              </Text>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {cart.items.length > 0 ? "۵۰,۰۰۰ تومان" : "۰ تومان"}
              </Text>
            </View>

            <View
              style={[styles.divider, { backgroundColor: colors.neutral[200] }]}
            />

            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>
                {STRINGS.TOTAL}
              </Text>
              <Text
                style={[styles.totalValue, { color: colors.primary.DEFAULT }]}
              >
                {(
                  cart.totalAmount + (cart.items.length > 0 ? 50000 : 0)
                ).toFixed(0)}{" "}
                تومان
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.background,
            borderTopColor: colors.neutral[200],
          },
        ]}
      >
        <Button
          title={STRINGS.PLACE_ORDER}
          onPress={handlePlaceOrder}
          isLoading={isLoading}
          fullWidth
          disabled={!selectedAddress || cart.items.length === 0}
        />
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
  section: {
    padding: 16,
    borderBottomWidth: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
  },
  addText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
  },
  addressCard: {
    padding: 16,
    borderRadius: BORDER_RADIUS.md,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  addressName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  addressText: {
    fontSize: FONT_SIZE.sm,
    marginBottom: 4,
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: BORDER_RADIUS.md,
  },
  addAddressText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
    marginLeft: 8,
  },
  paymentMethods: {
    marginTop: 16,
  },
  paymentMethodCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedPaymentMethod: {
    borderWidth: 1,
  },
  paymentMethodContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentMethodText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
    marginLeft: 12,
  },
  orderItems: {
    marginTop: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
    marginBottom: 4,
  },
  orderItemQuantity: {
    fontSize: FONT_SIZE.sm,
  },
  orderItemPrice: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  summaryContainer: {
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.md,
  },
  summaryValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
  },
  totalValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
  },
  bottomBar: {
    padding: 16,
    borderTopWidth: 1,
  },
});

export default CheckoutScreen;
