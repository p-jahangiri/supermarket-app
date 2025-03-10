import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useUserStore, useTheme } from "../store";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { resetPassword, isLoading, error, clearError } = useUserStore();
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = async () => {
    if (!email) return;

    clearError();
    await resetPassword(email);
    setIsSubmitted(true);

    // Show success message
    Alert.alert(STRINGS.RESET_PASSWORD, STRINGS.RESET_PASSWORD_SUCCESS, [
      {
        text: STRINGS.LOGIN,
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={colors === LIGHT_COLORS ? "dark-content" : "light-content"}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={[
                styles.backButton,
                { backgroundColor: colors.neutral[100] },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.neutral[700]}
              />
            </TouchableOpacity>

            <Text style={[styles.title, { color: colors.text }]}>
              {STRINGS.FORGOT_PASSWORD}
            </Text>
            <Text style={[styles.subtitle, { color: colors.neutral[600] }]}>
              {STRINGS.RESET_PASSWORD_INSTRUCTIONS}
            </Text>
          </View>

          <View style={styles.form}>
            {error && (
              <View
                style={[
                  styles.errorContainer,
                  { backgroundColor: colors.error + "20" },
                ]}
              >
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {error}
                </Text>
                <TouchableOpacity onPress={clearError}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.error}
                  />
                </TouchableOpacity>
              </View>
            )}

            <Input
              label={STRINGS.EMAIL}
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              leftIcon={
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.neutral[500]}
                />
              }
            />

            <Button
              title={STRINGS.SEND_RESET_LINK}
              onPress={handleResetPassword}
              isLoading={isLoading}
              fullWidth
              style={styles.resetButton}
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text
                style={[styles.loginText, { color: colors.primary.DEFAULT }]}
              >
                {STRINGS.BACK_TO_LOGIN}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const LIGHT_COLORS = {
  background: "#FFFFFF",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZE["2xl"],
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 16,
  },
  errorText: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
  },
  resetButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  loginButton: {
    alignItems: "center",
  },
  loginText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
});

export default ForgotPasswordScreen;
