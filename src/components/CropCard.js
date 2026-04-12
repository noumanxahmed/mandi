// src/components/CropCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

export default function CropCard({ crop, date, max, min, arrival }) {
  const isZeroPrice = max === 0 && min === 0;
  const hasArrivalData =
    arrival !== undefined && arrival !== null && arrival !== "";

  // Optional: This removes the year (e.g., "2026") from the date to save screen space!
  const shortDate = date ? date.replace(/ 20\d{2}/, "") : "";

  return (
    <View style={styles.tableRow}>
      {/* 1. Date Column (Far Right) */}
      <View style={[styles.cell, { flex: 1.8, alignItems: "flex-end" }]}>
        <Text style={styles.dateText} numberOfLines={1} adjustsFontSizeToFit>
          {shortDate}
        </Text>
      </View>

      {/* 2. Crop Name Column */}
      <View style={[styles.cell, { flex: 2.2, alignItems: "center" }]}>
        <Text style={styles.cropName} numberOfLines={1} adjustsFontSizeToFit>
          {crop}
        </Text>
      </View>

      {/* 3. Rate Column (Gets the most space since prices are long) */}
      <View style={[styles.cell, { flex: 3.2, alignItems: "center" }]}>
        {isZeroPrice ? (
          <Text style={styles.noRateText}>-</Text>
        ) : (
          <Text
            style={styles.priceRange}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {max}-{min}
          </Text>
        )}
      </View>

      {/* 4. Arrival Column */}
      <View style={[styles.cell, { flex: 1.3, alignItems: "center" }]}>
        <Text style={styles.arrivalText} numberOfLines={1} adjustsFontSizeToFit>
          {hasArrivalData ? arrival : "-"}
        </Text>
      </View>

      {/* 5. Click Indicator Icon */}
      <View style={styles.iconCell}>
        <Ionicons name="chevron-back" size={16} color={COLORS.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row-reverse", // Right-to-Left for Urdu
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: "center",
  },
  cell: {
    justifyContent: "center",
    paddingHorizontal: 2, // Tiny buffer so text doesn't touch
  },
  dateText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.textMuted,
    textAlign: "right",
  },
  cropName: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.textDark,
    textAlign: "center",
  },
  priceRange: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  noRateText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  arrivalText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  iconCell: {
    width: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
