import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useTheme } from "../store";
import { RootStackParamList } from "../types";
import Button from "../components/ui/Button";

type OrderSuccessRouteProp = RouteProp<RootStackParamList, "OrderSuccess">;

const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<OrderSuccessRouteProp>();
  const { orderId } = route.params;
  const { colors } = useTheme();

  const handleViewOrder = () => {
    navigation.navigate("OrderDetails", { orderId });
  };

  const handleContinueShopping = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Main");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.content}>
        <View
          style={[
            styles.successIconContainer,
            { backgroundColor: colors.success + "20" },
          ]}
        >
          <Ionicons name="checkmark-circle" size={80} color={colors.success} />
        </View>

        <Text style={[styles.successTitle, { color: colors.text }]}>
          {STRINGS.ORDER_SUCCESS}
        </Text>

        <Text style={[styles.successMessage, { color: colors.neutral[600] }]}>
          {STRINGS.ORDER_SUCCESS_MESSAGE}
        </Text>

        <View
          style={[
            styles.orderIdContainer,
            { backgroundColor: colors.neutral[100] },
          ]}
        >
          <Text style={[styles.orderIdLabel, { color: colors.neutral[600] }]}>
            {STRINGS.ORDER_ID}:
          </Text>
          <Text style={[styles.orderId, { color: colors.text }]}>
            {orderId}
          </Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Ionicons name="cart" size={100} color={colors.primary.DEFAULT} />
          <Ionicons
            name="arrow-forward"
            size={40}
            color={colors.neutral[400]}
            style={styles.arrowIcon}
          />
          <Ionicons name="home" size={100} color={colors.secondary.DEFAULT} />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={STRINGS.VIEW_ORDER}
            onPress={handleViewOrder}
            variant="primary"
            style={styles.button}
          />
          <Button
            title={STRINGS.CONTINUE_SHOPPING}
            onPress={handleContinueShopping}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 40,
  },
  successTitle: {
    fontSize: FONT_SIZE["2xl"],
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  successMessage: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    marginBottom: 24,
  },
  orderIdContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 32,
  },
  orderIdLabel: {
    fontSize: FONT_SIZE.md,
    marginRight: 8,
  },
  orderId: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  illustrationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    width: "100%",
  },
  arrowIcon: {
    marginHorizontal: 16,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    marginBottom: 16,
  },
});

export default OrderSuccessScreen;
