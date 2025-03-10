import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
  Easing,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../constants/theme";

interface PromoBannerProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  imageUrl: string;
  onPress: () => void;
  style?: ViewStyle;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  subtitle,
  buttonText,
  imageUrl,
  onPress,
  style,
}) => {
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();

    // Pulse animation for button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.image}
          imageStyle={{ borderRadius: BORDER_RADIUS.lg }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <Animated.Text
                style={[
                  styles.title,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                {title}
              </Animated.Text>

              {subtitle && (
                <Animated.Text
                  style={[
                    styles.subtitle,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: Animated.multiply(slideAnim, 1.5),
                        },
                      ],
                    },
                  ]}
                >
                  {subtitle}
                </Animated.Text>
              )}

              <Animated.View
                style={{
                  transform: [
                    { scale: Animated.multiply(buttonScaleAnim, pulseAnim) },
                  ],
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={onPress}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: "hidden",
    height: 150,
  },
  touchable: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    padding: SPACING.lg,
  },
  content: {
    maxWidth: "70%",
  },
  title: {
    color: "white",
    fontSize: FONT_SIZE.xl,
    fontWeight: "700",
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.md,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#333",
    fontSize: FONT_SIZE.sm,
    fontWeight: "600",
  },
});

export default PromoBanner;
