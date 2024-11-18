import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ThemeProvider from "@/components/ui/ThemeProvider";

import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

import "@/global.css";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Tabs screenOptions={defOptions}>
        <Tabs.Screen
          name="(index)"
          options={{
            title: "Launch",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="flag.2.crossed.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(explore)"
          options={{
            title: "Share",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const defOptions: BottomTabNavigationOptions = {
  // tabBarActiveTintColor: AC,
  headerShown: false,
  tabBarButton: HapticTab,
  tabBarBackground: TabBarBackground,
  tabBarStyle: Platform.select({
    ios: {
      // Use a transparent background on iOS to show the blur effect
      position: "absolute",
    },
    default: {},
  }),
};
