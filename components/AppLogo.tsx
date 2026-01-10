/**
 * Whist Score - App Logo Component
 * Inspired by classic card game imagery with A♠ and Q♥ cards
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
}

export function AppLogo({ size = "md" }: AppLogoProps) {
  const dimensions = {
    sm: { container: 48, card: 32, cardFont: 14, starSize: 16 },
    md: { container: 80, card: 52, cardFont: 20, starSize: 24 },
    lg: { container: 120, card: 76, cardFont: 28, starSize: 36 },
  }[size];

  return (
    <View
      style={[
        styles.container,
        { width: dimensions.container, height: dimensions.container },
      ]}
    >
      {/* Background */}
      <View
        style={[
          styles.background,
          { borderRadius: dimensions.container * 0.2 },
        ]}
      >
        {/* Card 1 - Ace of Spades */}
        <View
          style={[
            styles.card,
            styles.cardBack,
            {
              width: dimensions.card,
              height: dimensions.card * 1.3,
              transform: [{ rotate: "-15deg" }],
              left: dimensions.container * 0.1,
              top: dimensions.container * 0.15,
            },
          ]}
        >
          <Text style={[styles.cardText, { fontSize: dimensions.cardFont }]}>
            A
          </Text>
          <Text style={[styles.spade, { fontSize: dimensions.cardFont * 0.9 }]}>
            ♠
          </Text>
        </View>

        {/* Card 2 - Queen of Hearts */}
        <View
          style={[
            styles.card,
            styles.cardFront,
            {
              width: dimensions.card,
              height: dimensions.card * 1.3,
              transform: [{ rotate: "15deg" }],
              right: dimensions.container * 0.1,
              top: dimensions.container * 0.15,
            },
          ]}
        >
          <Text
            style={[
              styles.cardText,
              styles.heartText,
              { fontSize: dimensions.cardFont },
            ]}
          >
            Q
          </Text>
          <Text style={[styles.heart, { fontSize: dimensions.cardFont * 0.9 }]}>
            ♥
          </Text>
        </View>

        {/* Star Coin */}
        <View
          style={[
            styles.starCoin,
            {
              width: dimensions.starSize,
              height: dimensions.starSize,
              borderRadius: dimensions.starSize / 2,
              bottom: dimensions.container * 0.08,
              right: dimensions.container * 0.15,
            },
          ]}
        >
          <Text style={[styles.star, { fontSize: dimensions.starSize * 0.6 }]}>
            ★
          </Text>
        </View>

        {/* Red Ribbon */}
        <View
          style={[
            styles.ribbon,
            {
              width: dimensions.container * 0.7,
              height: dimensions.container * 0.12,
              bottom: dimensions.container * 0.18,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0d9488", // Teal background like the image
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    position: "absolute",
    backgroundColor: "#FFF8E7",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardBack: {
    zIndex: 1,
  },
  cardFront: {
    zIndex: 2,
  },
  cardText: {
    fontWeight: "bold",
    color: "#1a365d",
  },
  heartText: {
    color: "#dc2626",
  },
  spade: {
    color: "#1a365d",
  },
  heart: {
    color: "#dc2626",
  },
  starCoin: {
    position: "absolute",
    backgroundColor: "#f59e0b",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    borderWidth: 2,
    borderColor: "#d97706",
  },
  star: {
    color: "#fef3c7",
  },
  ribbon: {
    position: "absolute",
    backgroundColor: "#dc2626",
    zIndex: 0,
  },
});

export default AppLogo;
