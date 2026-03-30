// src/components/CropCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Built-in Expo icons
import { COLORS } from "../theme/colors";

export default function CropCard({ crop }) {
  return (
    <View style={styles.card}>
      {/* Fake Image Placeholder since we are skipping images for now */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name="leaf" size={40} color={COLORS.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.cropName}>{crop.name}</Text>
        <Text style={styles.dateText}>آج کی قیمت: {crop.date}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.maxText}>زیادہ سے زیادہ: </Text>
          <Text style={styles.maxPrice}>Rs {crop.maxPrice}</Text>
          <Ionicons name="trending-up" size={16} color={COLORS.success} />
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.minText}>کم از کم: </Text>
          <Text style={styles.minPrice}>Rs {crop.minPrice}</Text>
          <Ionicons name="trending-down" size={16} color={COLORS.alert} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2, // Android shadow
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15, // RTL naturally pushes this to the left side
  },
  content: {
    flex: 1,
  },
  cropName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  maxText: { fontSize: 14, color: COLORS.textDark },
  maxPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.success,
    marginRight: 5,
  },
  minText: { fontSize: 14, color: COLORS.textDark },
  minPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.alert,
    marginRight: 5,
  },
});
