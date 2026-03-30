// app/(tabs)/index.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../src/theme/colors";
import { DUMMY_CROPS } from "../../src/utils/dummyData";
import CropCard from "../../src/components/CropCard";

export default function HomeScreen() {
  const router = useRouter();

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

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/admin")}
      >
        <Ionicons name="add" size={32} color={COLORS.textDark} />
      </TouchableOpacity>
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
  list: { padding: 15 },
  fab: {
    position: "absolute",
    bottom: 20,
    left: 20, // Placed on the left because of RTL layout
    backgroundColor: COLORS.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow
  },
});
