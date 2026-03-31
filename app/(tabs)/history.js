// app/(tabs)/history.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../src/theme/colors";
import CropCard from "../../src/components/CropCard";

// --- FIREBASE IMPORTS ---
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../src/config/firebase";

export default function HistoryScreen() {
  const [allCrops, setAllCrops] = useState([]); // Holds EVERY price in the database
  const [filteredCrops, setFilteredCrops] = useState([]); // Holds only what the user is searching for
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // --- FETCH DATA FROM CLOUD ---
  const fetchHistory = async () => {
    try {
      const q = query(
        collection(db, "cropPrices"),
        orderBy("timestamp", "desc"),
      );
      const querySnapshot = await getDocs(q);

      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setAllCrops(fetchedData);
      setFilteredCrops(fetchedData); // When it first loads, show everything
    } catch (error) {
      console.error("❌ Error fetching history:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  // --- THE SEARCH LOGIC ---
  const handleSearch = (text) => {
    setSearchQuery(text);

    // If the search bar is empty, show all crops
    if (text === "") {
      setFilteredCrops(allCrops);
    } else {
      // Otherwise, filter the list! Convert everything to lowercase so "WHEAT" and "wheat" both work
      const filtered = allCrops.filter((item) =>
        item.cropName.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCrops(filtered);
    }
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
        <Text style={styles.headerTitle}>پرانا ریکارڈ (History)</Text>
      </View>

      {/* 👇 The Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="فصل تلاش کریں (Search crop...)"
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={COLORS.textMuted}
        />
        <Ionicons
          name="search"
          size={20}
          color={COLORS.textMuted}
          style={styles.searchIcon}
        />
      </View>

      <FlatList
        data={filteredCrops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CropCard
            crop={item.cropName}
            date={item.fullDate}
            max={item.maxPrice}
            min={item.minPrice}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
              name="search-outline"
              size={48}
              color={COLORS.textMuted}
            />
            <Text style={styles.emptyText}>کوئی نتیجہ نہیں ملا</Text>
            <Text style={styles.emptySubText}>
              Try searching for a different crop
            </Text>
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
    paddingHorizontal: 20,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    alignItems: "center",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: COLORS.primary },

  // Search Bar Styles
  searchContainer: {
    flexDirection: "row-reverse", // Keeps Urdu text right-to-left friendly
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 20,
    marginBottom: 0,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2, // Slight shadow
  },
  searchIcon: { marginLeft: 10 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    textAlign: "right",
  },

  listContainer: { padding: 20, paddingBottom: 100 },
  emptyBox: { alignItems: "center", marginTop: 50 },
  emptyText: {
    fontSize: 18,
    color: COLORS.textDark,
    fontWeight: "bold",
    marginTop: 10,
  },
  emptySubText: { fontSize: 14, color: COLORS.textMuted, marginTop: 5 },
});
