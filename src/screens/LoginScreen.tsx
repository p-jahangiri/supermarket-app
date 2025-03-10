import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useUserStore, useTheme } from "../store";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, isLoading, error, clearError } = useUserStore();
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    await login(email, password);
  };

  const handleRegister = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Register");
  };

  const handleForgotPassword = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("ForgotPassword");
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
            <Image
              source={require("../../assets/icon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={[styles.title, { color: colors.text }]}>
              {STRINGS.APP_NAME}
            </Text>
            <Text style={[styles.subtitle, { color: colors.neutral[600] }]}>
              {STRINGS.LOGIN}
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

            <Input
              label={STRINGS.PASSWORD}
              placeholder="••••••••"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              isPassword
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={colors.neutral[500]}
                />
              }
            />

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={handleForgotPassword}
            >
              <Text
                style={[
                  styles.forgotPasswordText,
                  { color: colors.primary.DEFAULT },
                ]}
              >
                {STRINGS.FORGOT_PASSWORD}
              </Text>
            </TouchableOpacity>

            <Button
              title={STRINGS.LOGIN}
              onPress={handleLogin}
              isLoading={isLoading}
              fullWidth
              style={styles.loginButton}
            />

            <View style={styles.registerContainer}>
              <Text
                style={[styles.registerText, { color: colors.neutral[600] }]}
              >
                {STRINGS.DONT_HAVE_ACCOUNT}
              </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text
                  style={[
                    styles.registerLink,
                    { color: colors.primary.DEFAULT },
                  ]}
                >
                  {STRINGS.REGISTER}
                </Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: FONT_SIZE["2xl"],
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "600",
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: "500",
  },
  loginButton: {
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    fontSize: FONT_SIZE.md,
    marginRight: 8,
  },
  registerLink: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
});

export default LoginScreen;
