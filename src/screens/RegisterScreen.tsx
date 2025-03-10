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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { STRINGS } from "../constants/strings";
import { useUserStore, useTheme } from "../store";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { register, isLoading, error, clearError } = useUserStore();
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    // Clear previous errors
    clearError();
    setPasswordError("");

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }

    // Register user
    await register(name, email, password);
  };

  const handleLogin = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Login");
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
              {STRINGS.REGISTER}
            </Text>
            <Text style={[styles.subtitle, { color: colors.neutral[600] }]}>
              {STRINGS.CREATE_ACCOUNT}
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
              label={STRINGS.NAME}
              placeholder="نام و نام خانوادگی"
              value={name}
              onChangeText={setName}
              leftIcon={
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={colors.neutral[500]}
                />
              }
            />

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

            <Input
              label={STRINGS.CONFIRM_PASSWORD}
              placeholder="••••••••"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword
              error={passwordError}
              leftIcon={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={colors.neutral[500]}
                />
              }
            />

            <Button
              title={STRINGS.REGISTER}
              onPress={handleRegister}
              isLoading={isLoading}
              fullWidth
              style={styles.registerButton}
            />

            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: colors.neutral[600] }]}>
                {STRINGS.ALREADY_HAVE_ACCOUNT}
              </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text
                  style={[styles.loginLink, { color: colors.primary.DEFAULT }]}
                >
                  {STRINGS.LOGIN}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
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
  registerButton: {
    marginTop: 16,
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: FONT_SIZE.md,
    marginRight: 8,
  },
  loginLink: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
});

export default RegisterScreen;
