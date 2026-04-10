// app/(tabs)/_layout.js
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the default top header
        // 👇 This completely hides the bottom tab bar!
        tabBarStyle: { display: "none" },
      }}
    >
      {/* 1. Main Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "ہوم",
        }}
      />

      {/* 2. Admin Screen (Hidden from tabs, but still accessible via button) */}
      <Tabs.Screen
        name="admin"
        options={{
          href: null, // 👇 This hides it from the tab navigation
        }}
      />
    </Tabs>
  );
}
