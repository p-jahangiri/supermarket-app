import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { useCartStore } from "../store";

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const handleCheckout = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Checkout");
  };

  const handleContinueShopping = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Home");
  };

  if (cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Cart</Text>
        </View>

        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color={COLORS.neutral[300]} />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubtext}>
            Browse our products and add items to your cart
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={{ uri: item.product.images[0] }}
              style={styles.productImage}
              resizeMode="cover"
            />

            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.productPrice}>
                ${(item.product.discountPrice || item.product.price).toFixed(2)}{" "}
                / {item.product.unit}
              </Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.itemTotalContainer}>
              <Text style={styles.itemTotalText}>
                $
                {(
                  (item.product.discountPrice || item.product.price) *
                  item.quantity
                ).toFixed(2)}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.product.id)}
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>
            ${cart.totalAmount.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={styles.summaryValue}>$5.00</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            ${(cart.totalAmount + 5).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[200],
  },
  headerTitle: {
    fontSize: FONT_SIZE["2xl"],
    fontWeight: "bold",
    color: COLORS.neutral[900],
  },
  clearText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.error,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "600",
    color: COLORS.neutral[700],
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: FONT_SIZE.md,
    color: COLORS.neutral[500],
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: COLORS.primary.DEFAULT,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: BORDER_RADIUS.md,
  },
  continueButtonText: {
    color: COLORS.neutral[50],
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: COLORS.neutral[50],
    borderRadius: BORDER_RADIUS.md,
    padding: 12,
    marginBottom: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.sm,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.neutral[800],
    marginBottom: 4,
  },
  productPrice: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.neutral[600],
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.neutral[200],
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.neutral[700],
  },
  quantityText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.neutral[800],
    marginHorizontal: 12,
  },
  itemTotalContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  itemTotalText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.neutral[900],
    marginBottom: 8,
  },
  removeButton: {
    padding: 4,
  },
  summaryContainer: {
    backgroundColor: COLORS.neutral[50],
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral[200],
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.neutral[600],
  },
  summaryValue: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.neutral[800],
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.neutral[200],
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    color: COLORS.neutral[900],
  },
  totalValue: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    color: COLORS.primary.DEFAULT,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary.DEFAULT,
    paddingVertical: 16,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutButtonText: {
    color: COLORS.neutral[50],
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
});

export default CartScreen;
