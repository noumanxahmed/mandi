// app/crop-history.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../src/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../src/theme/colors";
import CropCard from "../src/components/CropCard";

import DateTimePicker from "@react-native-community/datetimepicker";

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

export default function CropHistoryScreen() {
  const { cropName } = useLocalSearchParams();
  const router = useRouter();

  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  // 👇 NEW: State for Pull-to-Refresh
  const [refreshing, setRefreshing] = useState(false);

  // DATE PICKER STATES
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [searchDateString, setSearchDateString] = useState("");

  const fetchSpecificCropHistory = async () => {
    try {
      const q = query(
        collection(db, "cropPrices"),
        where("cropName", "==", cropName),
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("No records found, jumping to offline backup.");
      }

      let fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });

      fetchedData.sort((a, b) => b.timestamp - a.timestamp);

      setAllRecords(fetchedData);

      // If a user has a date filter active while refreshing, respect the filter!
      if (searchDateString !== "") {
        const filtered = fetchedData.filter(
          (item) => item.fullDate === searchDateString,
        );
        setFilteredRecords(filtered);
      } else {
        setFilteredRecords(fetchedData);
      }

      setIsOffline(false);

      // SAVE OFFLINE BACKUP
      await AsyncStorage.setItem(
        `@history_${cropName}`,
        JSON.stringify(fetchedData),
      );
    } catch (error) {
      console.log(`Loading offline backup for ${cropName}...`);
      setIsOffline(true);

      try {
        const savedRecords = await AsyncStorage.getItem(`@history_${cropName}`);
        if (savedRecords !== null) {
          const parsedRecords = JSON.parse(savedRecords);
          setAllRecords(parsedRecords);

          if (searchDateString !== "") {
            const filtered = parsedRecords.filter(
              (item) => item.fullDate === searchDateString,
            );
            setFilteredRecords(filtered);
          } else {
            setFilteredRecords(parsedRecords);
          }
        }
      } catch (storageError) {
        console.error("Failed to load local backup:", storageError);
      }
    } finally {
      setIsLoading(false);
      setRefreshing(false); // Stop the spinning wheel
    }
  };

  // 👇 NEW: Auto-fetch whenever the user comes to this screen
  useFocusEffect(
    useCallback(() => {
      if (cropName) {
        fetchSpecificCropHistory();
      }
    }, [cropName]),
  );

  // 👇 NEW: Triggered when the user pulls down on the list
  const onRefresh = () => {
    setRefreshing(true);
    fetchSpecificCropHistory();
  };

  const getFormattedUrduDate = (currentDate) => {
    const day = currentDate.getDate();
    const month = urduMonths[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");

    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = getFormattedUrduDate(selectedDate);
      setSearchDateString(formattedDate);

      const filtered = allRecords.filter(
        (item) => item.fullDate === formattedDate,
      );
      setFilteredRecords(filtered);
    }
  };

  const clearDateFilter = () => {
    setSearchDateString("");
    setFilteredRecords(allRecords);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>ریکارڈ لوڈ ہو رہا ہے...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle}>{cropName} کا ریکارڈ</Text>
            {isOffline && (
              <Text style={{ fontSize: 10, color: "red", marginTop: 2 }}>
                (آف لائن - پرانا ڈیٹا)
              </Text>
            )}
          </View>
          <View style={{ width: 45 }} />
        </View>
      </View>

      <View style={styles.searchRow}>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => setShowPicker(true)}
          activeOpacity={0.7}
        >
          {searchDateString ? (
            <TouchableOpacity onPress={clearDateFilter} style={styles.iconBox}>
              <Ionicons name="close-circle" size={24} color={COLORS.alert} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconBox}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={COLORS.textMuted}
              />
            </View>
          )}

          <Text
            style={[
              styles.searchInput,
              !searchDateString && { color: COLORS.textMuted },
            ]}
          >
            {searchDateString
              ? searchDateString
              : "تاریخ منتخب کریں (Select Date)"}
          </Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View pointerEvents="none">
            <CropCard
              crop={item.cropName}
              date={item.fullDate}
              max={item.maxPrice}
              min={item.minPrice}
              arrival={item.arrival}
            />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        // 👇 NEW: Added the Pull-to-Refresh feature
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons
              name="calendar-outline"
              size={48}
              color={COLORS.textMuted}
            />
            <Text style={styles.emptyText}>اس تاریخ کا کوئی ریکارڈ نہیں</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.textMuted,
    fontWeight: "bold",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: "#F0F9F0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E8E0",
  },
  titleWrapper: { alignItems: "center", flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: COLORS.primary },
  searchRow: { margin: 20, marginBottom: 0 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  iconBox: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: "right",
    paddingRight: 15,
  },
  listContainer: { padding: 20, paddingBottom: 100 },
  emptyBox: { alignItems: "center", marginTop: 50 },
  emptyText: {
    fontSize: 18,
    color: COLORS.textDark,
    fontWeight: "bold",
    marginTop: 10,
  },
});
