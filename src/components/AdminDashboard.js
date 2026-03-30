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
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker"; // <-- The new Calendar!
import { COLORS } from "../theme/colors";
import { DUMMY_CROPS, DUMMY_HISTORY } from "../utils/dummyData"; // Importing both lists now!

// Dictionary to translate computer months to Urdu
const urduMonths = [
  "جنوری",
  "فروری",
  "مارچ",
  "اپریل",
  "مئی",
  "جون",
  "جولائی",
  "اگست",
  "ستمبر",
  "اکتوبر",
  "نومبر",
  "دسمبر",
];

export default function AdminDashboard({ onLogout }) {
  const router = useRouter();

  // --- DIGITAL BUCKETS ---
  const [selectedCrop, setSelectedCrop] = useState(DUMMY_CROPS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Date Picker State
  const [date, setDate] = useState(new Date()); // Automatically sets to TODAY'S exact date!
  const [showPicker, setShowPicker] = useState(false); // Controls if the calendar is open or hidden

  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  // Function to format the standard date into our Urdu format (e.g., "30 مارچ 2026")
  const getFormattedUrduDate = (currentDate) => {
    const day = currentDate.getDate();
    const month = urduMonths[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Handles when the user picks a date on the calendar
  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios"); // iOS keeps it open, Android closes it automatically
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleUpdate = () => {
    if (!maxPrice || !minPrice) {
      Alert.alert(
        "غلطی (Error)",
        "براہ کرم زیادہ سے زیادہ اور کم از کم قیمت درج کریں۔",
      );
      return;
    }

    const formattedDate = getFormattedUrduDate(date);

    // 1. Create the new history record
    const newHistoryRecord = {
      id: Math.random().toString(), // Fake ID
      cropName: selectedCrop.name,
      fullDate: formattedDate, // Uses our perfectly formatted Urdu date!
      maxPrice: Number(maxPrice),
      minPrice: Number(minPrice),
    };

    // 2. Link it! Push the new record to the TOP of the dummy history list
    DUMMY_HISTORY.unshift(newHistoryRecord);

    console.log("✅ NEW RECORD ADDED TO HISTORY:", newHistoryRecord);

    Alert.alert(
      "کامیابی (Success)",
      `${selectedCrop.name} کی قیمت ${formattedDate} کے لیے اپ ڈیٹ ہو گئی۔`,
    );

    // Clear the prices for the next entry
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

          {isDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {DUMMY_CROPS.map((crop) => (
                <TouchableOpacity
                  key={crop.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedCrop(crop);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{crop.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* --- NATIVE CALENDAR BOX --- */}
          <Text style={styles.label}>تاریخ منتخب کریں</Text>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowPicker(true)}
          >
            {/* We display the nicely formatted Urdu date to the user */}
            <Text style={styles.inputText}>{getFormattedUrduDate(date)}</Text>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {/* The actual popup calendar widget */}
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

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
