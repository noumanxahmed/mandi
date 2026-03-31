// app/(tabs)/index.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { COLORS } from "../../src/theme/colors";
import CropCard from "../../src/components/CropCard";

// --- FIREBASE IMPORTS ---
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../src/config/firebase";

export default function HomeScreen() {
  const [liveCrops, setLiveCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // --- THE LOGIC: ONLY SHOW LATEST PRICE PER CROP ---
  const fetchLivePrices = async () => {
    try {
      // 1. Fetch all prices, newest first
      const q = query(
        collection(db, "cropPrices"),
        orderBy("timestamp", "desc"),
      );

      const querySnapshot = await getDocs(q);

      // 2. This is the filter "Engine"
      const latestPricesMap = new Map();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const cropName = data.cropName;

        // Since we ordered by 'desc' (newest first), the FIRST time we see
        // a crop name, it is guaranteed to be the latest price.
        // We only add it to the map if it's not already there.
        if (!latestPricesMap.has(cropName)) {
          latestPricesMap.set(cropName, {
            id: doc.id,
            ...data,
          });
        }
      });

      // 3. Convert our Map back into a simple array for the FlatList
      const finalDisplayList = Array.from(latestPricesMap.values());

      setLiveCrops(finalDisplayList);
    } catch (error) {
      console.error("❌ Error fetching live prices:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLivePrices();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLivePrices();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>
          تازہ ترین قیمتیں لوڈ ہو رہی ہیں...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>آج کی تازہ ترین قیمتیں</Text>
        <Text style={styles.subHeader}>Latest Market Rates</Text>
      </View>

      <FlatList
        data={liveCrops}
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
            <Text style={styles.emptyText}>کوئی قیمتیں موجود نہیں۔</Text>
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
  headerTitle: { fontSize: 22, fontWeight: "bold", color: COLORS.primary },
  subHeader: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  listContainer: { padding: 20, paddingBottom: 100 },
  emptyBox: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 18, color: COLORS.textDark, fontWeight: "bold" },
});
