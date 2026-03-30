// src/components/CustomInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

export default function CustomInput({
  label,
  iconName,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {/* We force LTR row direction here so the icon always stays on the left for English inputs like emails/passwords */}
        <View style={styles.iconWrapper}>
          <Ionicons name={iconName} size={20} color={COLORS.textMuted} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType || "default"}
          autoCapitalize="none"
          textAlign="left" // Keeps email/password typing left-to-right
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: COLORS.textDark,
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row-reverse", // Counters the global RTL for this specific English-input box
    backgroundColor: "#E8ECE8", // Matches the design's input background
    borderRadius: 8,
    height: 55,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  iconWrapper: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
  },
});
