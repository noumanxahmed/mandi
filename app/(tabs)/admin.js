// app/admin.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../src/theme/colors";
import AdminDashboard from "../../src/components/AdminDashboard";

// --- FIREBASE IMPORTS ---
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/config/firebase";

export default function AdminScreen() {
  // State for the Login screen
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Controls the loading spinner

  // --- REAL FIREBASE LOGIN LOGIC ---
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("غلطی (Error)", "براہ کرم ای میل اور پاس ورڈ درج کریں۔");
      return;
    }

    setIsLoading(true); // Turn on the loading spinner

    try {
      // This line actually talks to your Firebase Warehouse!
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      console.log("✅ Logged in successfully as:", userCredential.user.email);
      setIsLoggedIn(true); // Show the Dashboard

      // Clear the inputs for security
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("❌ Login Error:", error.code);
      // Friendly Urdu error messages based on what went wrong
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/invalid-email"
      ) {
        Alert.alert(
          "لاگ ان ناکام",
          "ای میل یا پاس ورڈ غلط ہے۔ دوبارہ کوشش کریں۔",
        );
      } else {
        Alert.alert("غلطی", "کچھ غلط ہو گیا۔ براہ کرم اپنا انٹرنیٹ چیک کریں۔");
      }
    } finally {
      setIsLoading(false); // Turn off the loading spinner
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // If successfully logged in, show the Admin Dashboard!
  if (isLoggedIn) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Otherwise, show the Login Screen
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ایڈمن پینل</Text>
      </View>

      <View style={styles.loginBox}>
        <View style={styles.iconCircle}>
          <Ionicons name="lock-closed" size={40} color={COLORS.primary} />
        </View>

        <Text style={styles.welcomeText}>خوش آمدید</Text>
        <Text style={styles.subText}>اپنے اکاؤنٹ میں لاگ ان کریں</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color={COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="ای میل (Email)"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="key-outline"
            size={20}
            color={COLORS.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="پاس ورڈ (Password)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.loginButtonText}>لاگ ان کریں</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 50,
    width: "100%",
    alignItems: "center",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: COLORS.primary },
  loginBox: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: "center",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8ECE8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 5,
  },
  subText: { fontSize: 14, color: COLORS.textMuted, marginBottom: 30 },
  inputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#F9FBF9",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: "100%",
  },
  inputIcon: { marginLeft: 15 },
  input: { flex: 1, fontSize: 16, color: COLORS.textDark, textAlign: "right" },
  loginButton: {
    backgroundColor: COLORS.primary,
    width: "100%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonDisabled: { opacity: 0.7 },
  loginButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});
