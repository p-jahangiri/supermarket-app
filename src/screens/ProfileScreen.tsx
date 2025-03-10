import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_SIZE, BORDER_RADIUS } from "../constants/theme";
import { useUserStore, useTheme } from "../store";
import { ThemeToggle } from "../components";
import { STRINGS } from "../constants/strings";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, isAuthenticated, logout } = useUserStore();
  const { colors } = useTheme();

  const handleLogin = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Auth");
  };

  const handleEditProfile = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("EditProfile");
  };

  const handleOrderHistory = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("OrderHistory");
  };

  const handleAbout = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("About");
  };

  const handleContact = () => {
    // @ts-ignore - We'll fix the navigation types later
    navigation.navigate("Contact");
  };

  const menuItems = [
    {
      id: "personal_info",
      title: STRINGS.PERSONAL_INFORMATION,
      icon: "person-outline",
      onPress: () => console.log("Personal Info"),
    },
    {
      id: "order_history",
      title: STRINGS.ORDER_HISTORY,
      icon: "time-outline",
      onPress: () => navigation.navigate("OrderHistory"),
    },
    {
      id: "shipping_addresses",
      title: STRINGS.SHIPPING_ADDRESSES,
      icon: "location-outline",
      onPress: () => console.log("Shipping Addresses"),
    },
    {
      id: "payment_methods",
      title: STRINGS.PAYMENT_METHODS,
      icon: "card-outline",
      onPress: () => console.log("Payment Methods"),
    },
    {
      id: "app_settings",
      title: STRINGS.APP_SETTINGS,
      icon: "settings-outline",
      onPress: () => console.log("App Settings"),
    },
    {
      id: "about_us",
      title: STRINGS.ABOUT_US,
      icon: "information-circle-outline",
      onPress: () => console.log("About Us"),
    },
    {
      id: "contact_us",
      title: STRINGS.CONTACT_US,
      icon: "mail-outline",
      onPress: () => console.log("Contact Us"),
    },
  ];

  if (!isAuthenticated || !user) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar
          barStyle={colors === COLORS ? "dark-content" : "light-content"}
          backgroundColor={colors.background}
        />

        <View
          style={[styles.header, { borderBottomColor: colors.neutral[200] }]}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Profile
          </Text>
        </View>

        <View style={styles.notLoggedInContainer}>
          <Ionicons
            name="person-circle-outline"
            size={80}
            color={colors.neutral[300]}
          />
          <Text
            style={[styles.notLoggedInText, { color: colors.neutral[700] }]}
          >
            You are not logged in
          </Text>
          <Text
            style={[styles.notLoggedInSubtext, { color: colors.neutral[500] }]}
          >
            Please log in to access your profile
          </Text>
          <TouchableOpacity
            style={[
              styles.loginButton,
              { backgroundColor: colors.primary.DEFAULT },
            ]}
            onPress={handleLogin}
          >
            <Text
              style={[styles.loginButtonText, { color: colors.neutral[50] }]}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={colors === COLORS ? "dark-content" : "light-content"}
        backgroundColor={colors.background}
      />

      <View style={[styles.header, { borderBottomColor: colors.neutral[200] }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Profile
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={[
            styles.profileHeader,
            { backgroundColor: colors.neutral[50] },
          ]}
        >
          <Image
            source={{
              uri:
                user.avatar || "https://randomuser.me/api/portraits/men/1.jpg",
            }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.neutral[900] }]}>
              {user.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.neutral[600] }]}>
              {user.email}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: colors.neutral[100] },
            ]}
            onPress={handleEditProfile}
          >
            <Ionicons
              name="pencil-outline"
              size={20}
              color={colors.primary.DEFAULT}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.neutral[700] }]}>
            Account
          </Text>

          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                {
                  backgroundColor: colors.neutral[50],
                  borderBottomColor: colors.neutral[100],
                },
              ]}
              onPress={item.onPress}
            >
              <View
                style={[
                  styles.menuIconContainer,
                  { backgroundColor: colors.neutral[100] },
                ]}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={colors.neutral[600]}
                />
              </View>
              <Text
                style={[styles.menuItemText, { color: colors.neutral[800] }]}
              >
                {item.title}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.neutral[400]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.neutral[700] }]}>
            App
          </Text>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.neutral[50],
                borderBottomColor: colors.neutral[100],
              },
            ]}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: colors.neutral[100] },
              ]}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color={colors.neutral[600]}
              />
            </View>
            <Text style={[styles.menuItemText, { color: colors.neutral[800] }]}>
              Notifications
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.neutral[400]}
            />
          </TouchableOpacity>

          <View
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.neutral[50],
                borderBottomColor: colors.neutral[100],
              },
            ]}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: colors.neutral[100] },
              ]}
            >
              <Ionicons
                name="color-palette-outline"
                size={22}
                color={colors.neutral[600]}
              />
            </View>
            <Text style={[styles.menuItemText, { color: colors.neutral[800] }]}>
              Theme
            </Text>
            <ThemeToggle showLabel={false} />
          </View>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.neutral[50],
                borderBottomColor: colors.neutral[100],
              },
            ]}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: colors.neutral[100] },
              ]}
            >
              <Ionicons
                name="language-outline"
                size={22}
                color={colors.neutral[600]}
              />
            </View>
            <Text style={[styles.menuItemText, { color: colors.neutral[800] }]}>
              Language
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.neutral[400]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.neutral[50],
                borderBottomColor: colors.neutral[100],
              },
            ]}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: colors.neutral[100] },
              ]}
            >
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={colors.neutral[600]}
              />
            </View>
            <Text style={[styles.menuItemText, { color: colors.neutral[800] }]}>
              About Us
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.neutral[400]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.neutral[50],
                borderBottomColor: colors.neutral[100],
              },
            ]}
          >
            <View
              style={[
                styles.menuIconContainer,
                { backgroundColor: colors.neutral[100] },
              ]}
            >
              <Ionicons
                name="call-outline"
                size={22}
                color={colors.neutral[600]}
              />
            </View>
            <Text style={[styles.menuItemText, { color: colors.neutral[800] }]}>
              Contact Us
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.neutral[400]}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.neutral[50] }]}
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={22} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>
            Log Out
          </Text>
        </TouchableOpacity>

        <Text style={[styles.versionText, { color: colors.neutral[500] }]}>
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
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
  notLoggedInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notLoggedInText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: "600",
    color: COLORS.neutral[700],
    marginTop: 16,
  },
  notLoggedInSubtext: {
    fontSize: FONT_SIZE.md,
    color: COLORS.neutral[500],
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: COLORS.primary.DEFAULT,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: BORDER_RADIUS.md,
  },
  loginButtonText: {
    color: COLORS.neutral[50],
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.neutral[50],
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "700",
    color: COLORS.neutral[900],
    marginBottom: 4,
  },
  userEmail: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.neutral[600],
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.neutral[100],
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: "700",
    color: COLORS.neutral[700],
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.neutral[50],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral[100],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.neutral[100],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.neutral[800],
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.neutral[50],
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: BORDER_RADIUS.md,
  },
  logoutText: {
    fontSize: FONT_SIZE.md,
    fontWeight: "600",
    color: COLORS.error,
    marginLeft: 8,
  },
  versionText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.neutral[500],
    textAlign: "center",
    marginTop: 16,
  },
});

export default ProfileScreen;
