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
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../src/theme/colors";

// --- FIREBASE IMPORTS ---
import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/config/firebase";

export default function AddCropScreen() {
  const router = useRouter();

  // --- STATE ---
  const [cropName, setCropName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- SAVE TO FIREBASE ---
  const handleSaveCategory = async () => {
    if (!cropName.trim()) {
      Alert.alert("غلطی", "براہ کرم فصل کا نام درج کریں۔");
      return;
    }

    setIsSubmitting(true);

    try {
      // 🚩 Sending to the 'availableCrops' collection
      await addDoc(collection(db, "availableCrops"), {
        name: cropName.trim(),
        createdAt: new Date(),
      });

      Alert.alert("کامیابی", `${cropName} لسٹ میں شامل ہو گئی۔`, [
        { text: "ٹھیک ہے", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("❌ Firebase Error:", error);
      Alert.alert("غلطی", "ڈیٹا محفوظ کرنے میں مسئلہ پیش آیا۔");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>نئی فصل شامل کریں</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>فصل کی کیٹیگری</Text>
        <Text style={styles.subTitle}>نئی فصل کو ڈیٹا بیس میں شامل کریں</Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.label}>فصل کا نام (Urdu/English)</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="مثلاً: کپاس (Cotton)"
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

        <View style={styles.noteBox}>
          <Ionicons
            name="information-circle"
            size={24}
            color={COLORS.primary}
            style={styles.noteIcon}
          />
          <View style={styles.noteTextContainer}>
            <Text style={styles.noteTitle}>ہدایت</Text>
            <Text style={styles.noteText}>
              یہاں صرف فصل کا نام لکھیں۔ اس کے بعد ایڈمن پینل سے اس کی روزانہ کی
              قیمت اپ ڈیٹ کر سکیں گے۔
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isSubmitting && { opacity: 0.7 }]}
          onPress={handleSaveCategory}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Text style={styles.saveButtonText}>محفوظ کریں</Text>
              <Ionicons
                name="cloud-upload-outline"
                size={22}
                color="#FFF"
                style={{ marginLeft: 10 }}
              />
            </>
          )}
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
  headerTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.primary },
  titleSection: { alignItems: "center", marginBottom: 30 },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
  subTitle: { fontSize: 14, color: COLORS.textMuted, marginTop: 5 },
  formSection: { paddingBottom: 40 },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  inputBox: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#E8ECE8",
    borderRadius: 12,
    height: 60,
    paddingHorizontal: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: { marginLeft: 15 },
  input: { flex: 1, fontSize: 18, color: COLORS.textDark, textAlign: "right" },
  noteBox: {
    flexDirection: "row-reverse",
    backgroundColor: "#E8F5E9",
    borderRadius: 15,
    padding: 15,
    marginBottom: 35,
    borderRightWidth: 4,
    borderRightColor: COLORS.primary,
  },
  noteIcon: { marginLeft: 15 },
  noteTextContainer: { flex: 1 },
  noteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "right",
    marginBottom: 4,
  },
  noteText: {
    fontSize: 13,
    color: COLORS.textDark,
    textAlign: "right",
    lineHeight: 20,
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
