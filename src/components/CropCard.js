// src/components/CropCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

export default function CropCard({ crop, date, max, min }) {
  return (
    <View style={styles.card}>
      {/* 1. The Box on the Left (Keeping your original 80x80 size) */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name="leaf" size={40} color={COLORS.primary} />
      </View>

      {/* 2. The Content on the Right */}
      <View style={styles.content}>
        <Text style={styles.cropName}>{crop}</Text>

        {/* Simple Date Text */}
        <Text style={styles.dateText}>آج کی قیمت: {date}</Text>

        {/* 3. The New Single Line Price (No green/red, no icons) */}
        <View style={styles.priceRow}>
          <Text style={styles.label}>ریٹ: </Text>
          <Text style={styles.priceRange}>
            Rs {max} - {min}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Standard row for your layout
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15, // Gap between box and text
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  cropName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  dateText: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 8, // Space before the price line
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  priceRange: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark, // Standard dark color (No more success/alert colors)
  },
});
