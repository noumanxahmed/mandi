// app/(tabs)/index.js
import React, { useState, useCallback } from "react";
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

import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs(["SafeAreaView has been deprecated", "@firebase/auth: Auth"]);

export default function HomeScreen() {
  const [liveCrops, setLiveCrops] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const router = useRouter();

  const fetchLivePrices = async () => {
    try {
      const q = query(
        collection(db, "cropPrices"),
        orderBy("timestamp", "desc"),
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Firebase is empty, jumping to offline backup!");
      }

      let fetchedDate = querySnapshot.docs[0].data().fullDate;
      setLastUpdated(fetchedDate);

      const latestPricesMap = new Map();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const cropName = data.cropName;

        if (!latestPricesMap.has(cropName)) {
          latestPricesMap.set(cropName, { id: doc.id, ...data });
        }
      });

      let cropsArray = Array.from(latestPricesMap.values());

      setLiveCrops(cropsArray);
      setIsOffline(false);

      await AsyncStorage.setItem(
        "@home_offline_crops",
        JSON.stringify(cropsArray),
      );
      if (fetchedDate) {
        await AsyncStorage.setItem("@home_offline_date", fetchedDate);
      }
    } catch (error) {
      console.log("No Internet or Empty Data. Loading Backup...");
      setIsOffline(true);

      try {
        const savedCrops = await AsyncStorage.getItem("@home_offline_crops");
        const savedDate = await AsyncStorage.getItem("@home_offline_date");

        if (savedCrops !== null) {
          setLiveCrops(JSON.parse(savedCrops));
        }
        if (savedDate !== null) {
          setLastUpdated(savedDate);
        }
      } catch (storageError) {
        console.error("Failed to load local backup:", storageError);
      }
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLivePrices();
    }, []),
  );

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
            <Text style={styles.headerTitle}>غلہ منڈی چشتیاں</Text>
            <Text style={styles.subHeader}>
              {lastUpdated ? `${lastUpdated}` : "Loading..."}
            </Text>
            {isOffline && (
              <Text style={{ fontSize: 10, color: "red", marginTop: 2 }}>
                (آف لائن - پرانا ڈیٹا)
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.logoBox}
            onPress={() => router.push("/admin")}
          >
            <Ionicons name="settings" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tableHeaderRow}>
        <Text
          style={[styles.tableHeaderText, { flex: 1.8, textAlign: "right" }]}
        >
          تاریخ
        </Text>
        <Text
          style={[styles.tableHeaderText, { flex: 2.2, textAlign: "center" }]}
        >
          اجناس
        </Text>
        <Text
          style={[styles.tableHeaderText, { flex: 3.2, textAlign: "center" }]}
        >
          ریٹ
        </Text>
        <Text
          style={[styles.tableHeaderText, { flex: 1.3, textAlign: "center" }]}
        >
          آمد (من)
        </Text>
        <View style={{ width: 16 }} />
      </View>

      <FlatList
        data={liveCrops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/crop-history",
                params: { cropName: item.cropName },
              })
            }
          >
            <CropCard
              crop={item.cropName}
              date={item.fullDate}
              max={item.maxPrice}
              min={item.minPrice}
              arrival={item.arrival}
            />
          </TouchableOpacity>
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
  tableHeaderRow: {
    flexDirection: "row-reverse",
    backgroundColor: "#F0F9F0",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableHeaderText: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  emptyBox: { alignItems: "center", marginTop: 50 },
  emptyText: { fontSize: 18, color: COLORS.textDark, fontWeight: "bold" },
});
