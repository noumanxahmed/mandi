// src/components/CropCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

export default function CropCard({ crop, date, max, min, arrival }) {
  // 👇 NEW LOGIC: We ONLY check if the prices are 0-0 (for older records).
  // We no longer hide the rate just because arrival is 0!
  const isZeroPrice = max === 0 && min === 0;

  const hasArrivalData =
    arrival !== undefined && arrival !== null && arrival !== "";

  return (
    <View style={styles.card}>
      {/* The Box on the Left */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name="leaf" size={40} color={COLORS.primary} />
      </View>

      {/* The Content on the Right */}
      <View style={styles.content}>
        <Text style={styles.cropName}>{crop}</Text>

        <Text style={styles.dateText}>آج کی قیمت: {date}</Text>

        {/* Arrival Row (Will now show "آمد: 0 بوری" if you typed 0) */}
        {hasArrivalData && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>آمد: </Text>
            <Text style={styles.arrivalText}>{arrival} من تقریباً</Text>
          </View>
        )}

        {/* The Price Row OR The "No Rate" Message for old 0-0 records */}
        {isZeroPrice ? (
          <View style={styles.infoRow}>
            <Text style={styles.noRateText}>کوئی ریٹ نہیں (No Rate)</Text>
          </View>
        ) : (
          <View style={styles.infoRow}>
            <Text style={styles.label}>ریٹ: </Text>
            <Text style={styles.priceRange}>
              Rs {max} - {min}
            </Text>
          </View>
        )}
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
    marginRight: 15,
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
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  label: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  arrivalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  priceRange: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  noRateText: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.alert,
    marginTop: 2,
  },
});
