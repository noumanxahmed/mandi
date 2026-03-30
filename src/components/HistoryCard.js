// src/components/HistoryCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function HistoryCard({ record }) {
  return (
    <View style={styles.card}>
      {/* Date Section */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{record.date}</Text>
        <Text style={styles.dayText}>{record.day}</Text>
      </View>

      {/* Min Price Section */}
      <View style={styles.priceContainer}>
        <View style={styles.minBadge}>
          <Text style={styles.minBadgeText}>کم سے کم</Text>
        </View>
        <Text style={styles.minPrice}>{record.minPrice}</Text>
      </View>

      {/* Max Price Section */}
      <View style={styles.maxBox}>
        <Text style={styles.maxBadgeText}>زیادہ سے زیادہ</Text>
        <Text style={styles.maxPrice}>{record.maxPrice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 1, // Subtle shadow
  },
  dateContainer: {
    flex: 1.2,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  dayText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    textTransform: "uppercase",
  },
  priceContainer: {
    flex: 1,
    alignItems: "center",
  },
  minBadge: {
    backgroundColor: "#FFEBEE", // Light red/pink
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 5,
  },
  minBadgeText: {
    fontSize: 10,
    color: COLORS.alert,
    fontWeight: "bold",
  },
  minPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.alert,
  },
  maxBox: {
    flex: 1.2,
    backgroundColor: "#C8E6C9", // Light green box from design
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  maxBadgeText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: "bold",
    marginBottom: 5,
  },
  maxPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
