// src/components/AdminDashboard.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../theme/colors";

// --- FIREBASE IMPORTS ---
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

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

const FALLBACK_CROP = { id: "fallback_1", name: "گندم (Wheat)" };

export default function AdminDashboard({ onLogout }) {
  const router = useRouter();

  // --- STATES ---
  const [availableCrops, setAvailableCrops] = useState([FALLBACK_CROP]);
  const [isLoadingCrops, setIsLoadingCrops] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState(FALLBACK_CROP);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // New Arrival State
  const [arrival, setArrival] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FETCH CATEGORIES FROM FIREBASE ---
  const fetchCropCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "availableCrops"));
      const fetchedCrops = [];

      querySnapshot.forEach((doc) => {
        fetchedCrops.push({
          id: doc.id,
          name: doc.data().name,
        });
      });

      if (fetchedCrops.length > 0) {
        setAvailableCrops(fetchedCrops);
        setSelectedCrop(fetchedCrops[0]);
      }
    } catch (error) {
      console.error("❌ Error fetching crop categories:", error);
    } finally {
      setIsLoadingCrops(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCropCategories();
    }, []),
  );

  const getFormattedUrduDate = (currentDate) => {
    const day = currentDate.getDate();
    const month = urduMonths[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleUpdate = async () => {
    // 1. Check if Arrival is entered
    if (arrival === "") {
      Alert.alert("غلطی", "براہ کرم آمد (Arrival) درج کریں۔");
      return;
    }

    // 2. ALWAYS enforce max and min prices, regardless of arrival
    if (!maxPrice || !minPrice) {
      Alert.alert(
        "غلطی",
        "براہ کرم زیادہ سے زیادہ اور کم از کم قیمت درج کریں۔",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "cropPrices"), {
        cropName: selectedCrop.name,
        fullDate: getFormattedUrduDate(date),
        arrival: Number(arrival),
        maxPrice: Number(maxPrice), // Always save the actual typed max price
        minPrice: Number(minPrice), // Always save the actual typed min price
        timestamp: new Date(),
      });
      Alert.alert("کامیابی", `${selectedCrop.name} کا ڈیٹا محفوظ ہوگیا۔`);
      setMaxPrice("");
      setMinPrice("");
      setArrival("");
    } catch (error) {
      Alert.alert("غلطی", "ڈیٹا محفوظ نہیں ہوسکا۔");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onLogout}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ایڈمن پینل</Text>
          <Ionicons name="eye-off-outline" size={24} color={COLORS.primary} />
        </View>
        {/* // not want this box right now */}
        {/* <View style={styles.heroBox}>
          <Ionicons name="cloud-upload-outline" size={40} color="#FFF" />
          <Text style={styles.heroText}>کلاؤڈ ڈیٹا بیس میں محفوظ کریں</Text>
        </View> */}
        <View style={styles.formSection}>
          <Text style={styles.label}>فصل منتخب کریں</Text>

          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={isLoadingCrops}
          >
            <Text style={styles.inputText}>
              {isLoadingCrops ? "لوڈنگ..." : selectedCrop.name}
            </Text>
            <Ionicons
              name={isDropdownOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {availableCrops.map((crop) => (
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

          <Text style={styles.label}>تاریخ</Text>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.inputText}>{getFormattedUrduDate(date)}</Text>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(e, d) => {
                setShowPicker(Platform.OS === "ios");
                if (d) setDate(d);
              }}
            />
          )}

          <Text style={styles.label}>آمد (Arrival)</Text>
          <View style={styles.priceInputBox}>
            <Text style={styles.currency}>من تقریباً</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0"
              keyboardType="numeric"
              value={arrival}
              onChangeText={setArrival}
            />
            <Ionicons name="bus-outline" size={20} color={COLORS.primary} />
          </View>

          {/* 👇 REMOVED THE CONDITION SO THESE ALWAYS SHOW 👇 */}
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

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdate}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.updateButtonText}>محفوظ کریں</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* FAB to add new crop category */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-crop")}
      >
        <Ionicons name="add" size={32} color="#FFF" />
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
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: COLORS.primary },
  heroBox: {
    backgroundColor: COLORS.primary,
    height: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  heroText: { color: "#FFF", fontSize: 18, fontWeight: "bold", marginTop: 10 },
  formSection: { paddingBottom: 100 },
  label: {
    fontSize: 15,
    color: COLORS.textDark,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "right",
  },
  inputBox: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8ECE8",
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
    textAlign: "right",
  },
  inputText: { fontSize: 16, color: COLORS.textDark },
  dropdownMenu: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginTop: -15,
    marginBottom: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
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
    borderRadius: 10,
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
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  updateButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  fab: {
    position: "absolute",
    bottom: 30,
    left: 30,
    backgroundColor: COLORS.primary,
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});
