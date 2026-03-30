// src/components/AdminDashboard.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // <-- Added this!
import { COLORS } from "../theme/colors";

export default function AdminDashboard({ onLogout }) {
  const router = useRouter(); // <-- Initialize the router

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onLogout}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>قیمت اپ ڈیٹ کریں</Text>
          <Ionicons name="eye-off-outline" size={24} color={COLORS.primary} />
        </View>

        {/* Fake Image Header */}
        <View style={styles.heroBox}>
          <Ionicons name="image-outline" size={40} color="#FFF" />
          <Text style={styles.heroText}>روزانہ کی قیمتوں کا انتظام</Text>
        </View>

        {/* Update Form */}
        <View style={styles.formSection}>
          <Text style={styles.label}>فصل منتخب کریں</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputText}>گندم (Wheat)</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.textMuted} />
          </View>

          <Text style={styles.label}>تاریخ منتخب کریں</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputText}>10 / 03 / 2026</Text>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </View>

          <Text style={styles.label}>زیادہ سے زیادہ قیمت</Text>
          <View style={styles.priceInputBox}>
            <Text style={styles.currency}>PKR</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
            />
            <Ionicons name="trending-up" size={20} color={COLORS.success} />
          </View>

          <Text style={styles.label}>کم از کم قیمت</Text>
          <View style={styles.priceInputBox}>
            <Text style={styles.currency}>PKR</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
            />
            <Ionicons name="trending-down" size={20} color={COLORS.alert} />
          </View>

          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>قیمت اپ ڈیٹ کریں</Text>
            <Ionicons
              name="refresh"
              size={20}
              color="#FFF"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Action Button (FAB) moved here! */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-crop")}
      >
        <Ionicons name="add" size={32} color={COLORS.textDark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  heroBox: {
    backgroundColor: COLORS.primary,
    height: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  heroText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  formSection: {
    paddingBottom: 80, // Added a little extra padding so the scroll clears the button
  },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8ECE8",
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    color: COLORS.textDark,
  },
  priceInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8ECE8",
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  currency: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textMuted,
    marginRight: 15,
  },
  priceInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    textAlign: "right",
    paddingRight: 15,
  },
  updateButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 12,
    marginTop: 10,
    elevation: 2,
  },
  updateButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  // Added the FAB styling here!
  fab: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: COLORS.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
