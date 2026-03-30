// app/(tabs)/history.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../src/theme/colors";
import { DUMMY_HISTORY } from "../../src/utils/dummyData";
import HistoryCard from "../../src/components/HistoryCard";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>قیمت کی تاریخ</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="فصل تلاش کریں..."
          placeholderTextColor={COLORS.textMuted}
        />
      </View>

      {/* Date Selector (Horizontal Scroll) */}
      <View style={styles.dateSection}>
        <Text style={styles.sectionTitle}>تاریخ منتخب کریں</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {/* Active Date */}
          <View style={[styles.dateBox, styles.dateBoxActive]}>
            <Text style={[styles.dateDay, styles.textWhite]}>TODAY</Text>
            <Text style={[styles.dateNumber, styles.textWhite]}>14</Text>
            <Text style={[styles.dateMonth, styles.textWhite]}>مارچ</Text>
          </View>
          {/* Inactive Dates */}
          <View style={styles.dateBox}>
            <Text style={styles.dateDay}>WED</Text>
            <Text style={styles.dateNumber}>13</Text>
            <Text style={styles.dateMonth}>مارچ</Text>
          </View>
          <View style={styles.dateBox}>
            <Text style={styles.dateDay}>TUE</Text>
            <Text style={styles.dateNumber}>12</Text>
            <Text style={styles.dateMonth}>مارچ</Text>
          </View>
        </ScrollView>
      </View>

      {/* History List */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>گندم کی قیمتوں کا ریکارڈ</Text>
        <Ionicons name="filter" size={20} color={COLORS.textMuted} />
      </View>

      <FlatList
        data={DUMMY_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard record={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: COLORS.primary },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.inputBackground,
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, textAlign: "right" },
  dateSection: { marginTop: 20, paddingLeft: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginBottom: 10,
  },
  dateScroll: { flexDirection: "row" },
  dateBox: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginRight: 10,
    elevation: 1,
  },
  dateBoxActive: { backgroundColor: COLORS.primary },
  dateDay: { fontSize: 12, color: COLORS.textMuted, fontWeight: "bold" },
  dateNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textDark,
    marginVertical: 4,
  },
  dateMonth: { fontSize: 12, color: COLORS.textMuted },
  textWhite: { color: "#FFF" },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
});
