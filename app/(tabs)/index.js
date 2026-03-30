// app/(tabs)/index.js
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS } from "../../src/theme/colors";
import { DUMMY_CROPS } from "../../src/utils/dummyData";
import CropCard from "../../src/components/CropCard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>کسان ہارویسٹ</Text>
      </View>

      {/* Crop List */}
      <FlatList
        data={DUMMY_CROPS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CropCard crop={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: { color: "#FFF", fontSize: 24, fontWeight: "bold" },
  list: { padding: 15 }, // <-- This is the line that was causing the error!
});
