// app/add-crop.js
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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/theme/colors";
import { DUMMY_CROPS } from "../src/utils/dummyData"; // Importing our dummy database!

export default function AddCropScreen() {
  const router = useRouter();

  // --- DIGITAL BUCKETS FOR THE NEW CROP ---
  const [cropName, setCropName] = useState("");
  const [date, setDate] = useState("30 مارچ 2026"); // Today's date
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");

  // --- THE SAVE FUNCTION ---
  const handleSave = () => {
    // 1. Validation: Don't let them save an empty form
    if (!cropName || !maxPrice || !minPrice) {
      Alert.alert("غلطی (Error)", "براہ کرم تمام معلومات درج کریں۔");
      return;
    }

    // 2. Create the new crop object
    const newCrop = {
      id: Math.random().toString(), // Generates a random ID for testing
      name: cropName,
      date: date,
      maxPrice: Number(maxPrice),
      minPrice: Number(minPrice),
      trend: "up", // Fake trend for now
      percentage: "+0.0%",
    };

    // 3. Push it into our Dummy Data Array (Temporary Memory!)
    DUMMY_CROPS.push(newCrop);

    console.log("✅ NEW CROP ADDED:", newCrop);
    console.log("📦 CURRENT DATABASE:", DUMMY_CROPS);

    // 4. Show success message and go back to the Admin Dashboard
    Alert.alert("کامیابی (Success)", "نئی فصل کامیابی سے شامل کر لی گئی۔", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>نئی فصل</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>ڈیجیٹل لیجر کی نئی انٹری</Text>
        <Text style={styles.subTitle}>تازہ ترین منڈی کے نرخ اپ ڈیٹ کریں</Text>
      </View>

      {/* Image Upload Box (Dashed) */}
      <TouchableOpacity style={styles.uploadBox}>
        <View style={styles.cameraIconBox}>
          <Ionicons name="camera" size={30} color="#FFF" />
        </View>
        <Text style={styles.uploadText}>فصل کی تصویر منتخب کریں</Text>
        <Text style={styles.uploadSubText}>PNG, JPG up to 10MB</Text>
      </TouchableOpacity>

      <View style={styles.formSection}>
        {/* Crop Name */}
        <Text style={styles.label}>فصل کا نام</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="مثلاً مکئی (Corn)"
            placeholderTextColor={COLORS.textMuted}
            value={cropName}
            onChangeText={setCropName}
          />
          <Ionicons
            name="leaf-outline"
            size={20}
            color={COLORS.primary}
            style={styles.inputIcon}
          />
        </View>

        {/* Date */}
        <Text style={styles.label}>تاریخ</Text>
        <View style={styles.inputBox}>
          <TextInput style={styles.input} value={date} onChangeText={setDate} />
          <Ionicons
            name="calendar-outline"
            size={20}
            color={COLORS.textDark}
            style={styles.inputIcon}
          />
        </View>

        {/* Max Price */}
        <Text style={styles.label}>زیادہ سے زیادہ قیمت (روپے)</Text>
        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: "#FFF",
              borderColor: COLORS.border,
              borderWidth: 1,
            },
          ]}
        >
          <TextInput
            style={[styles.input, { fontWeight: "bold" }]}
            placeholder="0.00"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />
          <Ionicons
            name="trending-up"
            size={20}
            color={COLORS.primary}
            style={styles.inputIcon}
          />
        </View>

        {/* Min Price */}
        <Text style={styles.label}>کم از کم قیمت (روپے)</Text>
        <View
          style={[
            styles.inputBox,
            {
              backgroundColor: "#FFF",
              borderColor: COLORS.border,
              borderWidth: 1,
            },
          ]}
        >
          <TextInput
            style={[styles.input, { fontWeight: "bold" }]}
            placeholder="0.00"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            value={minPrice}
            onChangeText={setMinPrice}
          />
          <Ionicons
            name="trending-down"
            size={20}
            color={COLORS.alert}
            style={styles.inputIcon}
          />
        </View>

        <View style={styles.noteBox}>
          <Ionicons
            name="information-circle"
            size={24}
            color={COLORS.primary}
            style={styles.noteIcon}
          />
          <View style={styles.noteTextContainer}>
            <Text style={styles.noteTitle}>ضروری نوٹ</Text>
            <Text style={styles.noteText}>
              درج کردہ قیمتیں پنجاب بھر کی بڑی منڈیوں کے اوسط نرخوں کے مطابق
              ہونی چاہئیں۔
            </Text>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>محفوظ کریں</Text>
          <Ionicons
            name="save-outline"
            size={20}
            color="#FFF"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>منسوخ کریں</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: COLORS.primary },
  titleSection: { alignItems: "center", marginBottom: 25 },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
  subTitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 5 },
  uploadBox: {
    borderWidth: 2,
    borderColor: "#C8E6C9",
    borderStyle: "dashed",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#F9FBF9",
  },
  cameraIconBox: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  uploadText: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  uploadSubText: { fontSize: 12, color: COLORS.textMuted, marginTop: 5 },
  formSection: { paddingBottom: 40 },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "right",
  },
  inputBox: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#E8ECE8",
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputIcon: { marginLeft: 15 },
  input: { flex: 1, fontSize: 16, color: COLORS.textDark, textAlign: "right" },
  noteBox: {
    flexDirection: "row-reverse",
    backgroundColor: "#E8F5E9",
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  noteIcon: { marginLeft: 15, marginTop: 2 },
  noteTextContainer: { flex: 1 },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "right",
    marginBottom: 4,
  },
  noteText: {
    fontSize: 12,
    color: COLORS.textDark,
    textAlign: "right",
    lineHeight: 18,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },
  saveButtonText: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  cancelButton: { alignItems: "center", paddingVertical: 10 },
  cancelButtonText: { color: COLORS.primary, fontSize: 16 },
});
