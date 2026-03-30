import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  I18nManager,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";

// Force RTL for Urdu globally
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

export default function RootLayout() {
  const [isOffline, setIsOffline] = useState(false);

  // Global active listener for internet connection
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(state.isConnected === false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F8F4" }}>
      {/* Global Offline Alert Banner */}
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            آپ آف لائن ہیں۔ پرانی قیمتیں دکھائی جا رہی ہیں۔
          </Text>
        </View>
      )}

      {/* This Stack automatically loads the (tabs) folder */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  offlineBanner: {
    backgroundColor: "#D32F2F", // Alert Red
    padding: 10,
    alignItems: "center",
    zIndex: 100, // Ensures it stays on top
  },
  offlineText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
