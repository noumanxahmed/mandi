// app/(tabs)/admin.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../src/theme/colors";
import CustomInput from "../../src/components/CustomInput";
import AdminDashboard from "../../src/components/AdminDashboard"; // Imports our new dashboard!

export default function AdminScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. IF LOGGED IN: Show the Dashboard
  if (isLoggedIn) {
    return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  // 2. IF NOT LOGGED IN: Show the Login Form
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Icon */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Ionicons name="shield-checkmark" size={40} color="#FFF" />
          </View>
          <Text style={styles.mainTitle}>ایڈمن لاگ ان</Text>
          <Text style={styles.subTitle}>AGRICULTURAL LEDGER ACCESS</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <CustomInput
            label="ای میل درج کریں"
            iconName="mail"
            placeholder="admin@kissan.com.pk"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomInput
            label="پاس ورڈ درج کریں"
            iconName="lock-closed"
            placeholder="••••••••"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => setIsLoggedIn(true)}
          >
            <Text style={styles.loginButtonText}>لاگ ان کریں</Text>
            <Ionicons
              name="arrow-forward"
              size={24}
              color="#FFF"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>پاس ورڈ بھول گئے؟</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            DIGITAL LEDGER SYSTEM • PUNJAB 2024 ©
          </Text>
          <Text style={styles.footerText}>MARKETS</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  logoBox: {
    backgroundColor: COLORS.primary,
    width: 80,
    height: 80,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  subTitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: COLORS.cardBackground,
    padding: 20,
    borderRadius: 20,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  buttonIcon: {
    position: "absolute",
    left: 20,
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  forgotText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
  },
  footerText: {
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginTop: 2,
  },
});
