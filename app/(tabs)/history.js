// app/(tabs)/history.js
import React, { useState } from "react";
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
import { DUMMY_HISTORY, HISTORY_DATES } from "../../src/utils/dummyData";
import HistoryCard from "../../src/components/HistoryCard";

export default function HistoryScreen() {
  // 1. Set up our state for the Search Bar and the active Date
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDate, setActiveDate] = useState(HISTORY_DATES[0].fullDate); // Defaults to "14 مارچ 2026"

  // 2. The Filter Logic: This runs every time the user types or clicks a date
  const filteredHistory = DUMMY_HISTORY.filter((record) => {
    const matchesDate = record.fullDate === activeDate;
    const matchesSearch = record.cropName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesDate && matchesSearch;
  });

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
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {/* Quick clear button if text exists */}
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Interactive Date Selector */}
      <View style={styles.dateSection}>
        <Text style={styles.sectionTitle}>تاریخ منتخب کریں</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {HISTORY_DATES.map((dateObj) => {
            const isActive = activeDate === dateObj.fullDate;

            return (
              <TouchableOpacity
                key={dateObj.id}
                style={[styles.dateBox, isActive && styles.dateBoxActive]}
                onPress={() => setActiveDate(dateObj.fullDate)}
              >
                <Text style={[styles.dateDay, isActive && styles.textWhite]}>
                  {dateObj.dayName}
                </Text>
                <Text style={[styles.dateNumber, isActive && styles.textWhite]}>
                  {dateObj.dateNum}
                </Text>
                <Text style={[styles.dateMonth, isActive && styles.textWhite]}>
                  {dateObj.month}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* History List */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>منڈی کا ریکارڈ</Text>
        <Ionicons name="filter" size={20} color={COLORS.textMuted} />
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard record={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              color: COLORS.textMuted,
              marginTop: 20,
            }}
          >
            کوئی ریکارڈ نہیں ملا (No records found)
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 20, paddingTop: 40, alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: COLORS.primary },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    height: 50,
    elevation: 2,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, textAlign: "right", paddingRight: 10 },
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
    minWidth: 80,
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
