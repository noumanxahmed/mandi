// src/components/CropCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

export default function CropCard({ crop, date, max, min, arrival }) {
  const isZeroPrice = max === 0 && min === 0;
  const hasArrivalData =
    arrival !== undefined && arrival !== null && arrival !== "";

  const shortDate = date ? date.replace(/ 20\d{2}/, "") : "";

  return (
    <View style={[styles.tableRow, { direction: "ltr" }]}>
      <View style={styles.iconCell}>
        <Ionicons name="chevron-back" size={16} color={COLORS.primary} />
      </View>

      <View style={[styles.cell, { flex: 1.3, alignItems: "flex-start" }]}>
        <Text style={styles.arrivalText} numberOfLines={1} adjustsFontSizeToFit>
          {hasArrivalData ? arrival : "-"}
        </Text>
      </View>
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

      <View style={[styles.cell, { flex: 2.2, alignItems: "center" }]}>
        <Text style={styles.cropName} numberOfLines={1} adjustsFontSizeToFit>
          {crop}
        </Text>
      </View>

      <View style={[styles.cell, { flex: 1.8, alignItems: "flex-end" }]}>
        <Text style={styles.dateText} numberOfLines={1} adjustsFontSizeToFit>
          {shortDate}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: "center",
  },
  cell: {
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  dateText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.textMuted,
    textAlign: "right",
  },
  cropName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    textAlign: "center",
  },
  priceRange: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  noRateText: {
    fontSize: 18,
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
