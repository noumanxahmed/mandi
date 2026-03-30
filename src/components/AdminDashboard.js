// src/components/AdminDashboard.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS } from "../theme/colors";
import { DUMMY_CROPS } from "../utils/dummyData"; // Importing our fake database!

export default function AdminDashboard({ onLogout }) {
  const router = useRouter();

  // --- THE DIGITAL BUCKETS (React State) ---
  // We use these to hold the data temporarily before sending it to Firebase
  const [selectedCrop, setSelectedCrop] = useState(DUMMY_CROPS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState("30 مارچ 2026");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  // --- THE FIREBASE WAITING ROOM ---
  const handleUpdate = () => {
    // 1. Validation: Make sure the admin didn't leave the boxes empty
    if (!maxPrice || !minPrice) {
      Alert.alert(
        "غلطی (Error)",
        "براہ کرم زیادہ سے زیادہ اور کم از کم قیمت درج کریں۔",
      );
      return;
    }

    // 2. The Payload: Packaging the data exactly how Firebase will want it
    const updatePayload = {
      cropId: selectedCrop.id,
      cropName: selectedCrop.name,
      updateDate: date,
      maximumPrice: Number(maxPrice),
      minimumPrice: Number(minPrice),
    };

    // 3. Simulation: Right now we just log it. Later, we swap this log for a Firebase function!
    console.log("📦 READY TO SEND TO FIREBASE:", updatePayload);

    // 4. Success Feedback
    Alert.alert(
      "کامیابی (Success)",
      `${selectedCrop.name} کی قیمت اپ ڈیٹ ہو گئی۔`,
    );

    // 5. Clear the buckets for the next entry
    setMaxPrice("");
    setMinPrice("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onLogout}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>قیمت اپ ڈیٹ کریں</Text>
          <Ionicons name="eye-off-outline" size={24} color={COLORS.primary} />
        </View>

        <View style={styles.heroBox}>
          <Ionicons name="image-outline" size={40} color="#FFF" />
          <Text style={styles.heroText}>روزانہ کی قیمتوں کا انتظام</Text>
        </View>

        <View style={styles.formSection}>
          {/* --- INTERACTIVE CROP DROPDOWN --- */}
          <Text style={styles.label}>فصل منتخب کریں</Text>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Text style={styles.inputText}>{selectedCrop.name}</Text>
            <Ionicons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {/* The hidden list that appears when you click the dropdown */}
          {isDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {DUMMY_CROPS.map((crop) => (
                <TouchableOpacity
                  key={crop.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCrop(crop);
                    setIsDropdownOpen(false); // Close menu after selecting
                  }}
                >
                  <Text style={styles.dropdownItemText}>{crop.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* --- DATE INPUT --- */}
          <Text style={styles.label}>تاریخ منتخب کریں</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.inputText, { flex: 1, textAlign: "right" }]}
              value={date}
              onChangeText={setDate}
            />
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.textMuted}
              style={{ marginLeft: 10 }}
            />
          </View>

          {/* --- MAX PRICE INPUT --- */}
          <Text style={styles.label}>زیادہ سے زیادہ قیمت</Text>
          <View style={styles.priceInputBox}>
            <Text style={styles.currency}>PKR</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
            <Ionicons name="trending-up" size={20} color={COLORS.success} />
          </View>

          {/* --- MIN PRICE INPUT --- */}
          <Text style={styles.label}>کم از کم قیمت</Text>
          <View style={styles.priceInputBox}>
            <Text style={styles.currency}>PKR</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <Ionicons name="trending-down" size={20} color={COLORS.alert} />
          </View>

          {/* --- SUBMIT BUTTON --- */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
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

      {/* Floating Action Button */}
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
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: COLORS.primary },
  heroBox: {
    backgroundColor: COLORS.primary,
    height: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  heroText: { color: "#FFF", fontSize: 18, fontWeight: "bold", marginTop: 10 },
  formSection: { paddingBottom: 80 },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputBox: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8ECE8",
    borderRadius: 8,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputText: { fontSize: 16, color: COLORS.textDark },

  // New Styles for our Dropdown!
  dropdownMenu: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginTop: -15,
    marginBottom: 20,
    padding: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: "right",
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
  updateButtonText: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
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
