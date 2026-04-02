// app/(tabs)/index.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  LogBox,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../src/theme/colors";
import CropCard from "../../src/components/CropCard";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../src/config/firebase";

// Note: The above log suppression is temporary. We will refactor to use the new SafeAreaView from react-native-safe-area-context in the future.  and second one is for firebase auth warning which is not relevant to our app right now.
LogBox.ignoreLogs(["SafeAreaView has been deprecated", "@firebase/auth: Auth"]);
``;

export default function HomeScreen() {
  const [liveCrops, setLiveCrops] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLivePrices = async () => {
    try {
      const q = query(
        collection(db, "cropPrices"),
        orderBy("timestamp", "desc"),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setLastUpdated(querySnapshot.docs[0].data().fullDate);
      }

      const latestPricesMap = new Map();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const cropName = data.cropName;

        if (!latestPricesMap.has(cropName)) {
          latestPricesMap.set(cropName, { id: doc.id, ...data });
        }
      });

      setLiveCrops(Array.from(latestPricesMap.values()));
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
        <View style={styles.headerRow}>
          <View style={{ width: 45 }} />
          <View style={styles.titleWrapper}>
            <Text style={styles.headerTitle}>چشتیاں منڈی</Text>
            <Text style={styles.subHeader}>
              {lastUpdated ? `${lastUpdated}` : "Loading..."}
            </Text>
          </View>
          <TouchableOpacity style={styles.logoBox}>
            <Ionicons name="leaf" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
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
            arrival={item.arrival} /* 👈 Passing Arrival */
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
  titleWrapper: { alignItems: "center", flex: 1 },
  logoBox: {
    width: 45,
    height: 45,
    backgroundColor: "#F0F9F0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E8E0",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: COLORS.primary },
  subHeader: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.success,
    marginTop: 4,
  },
  listContainer: { padding: 20, paddingBottom: 100 },
  emptyBox: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 18, color: COLORS.textDark, fontWeight: "bold" },
});
