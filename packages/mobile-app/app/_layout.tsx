import "../utils/polyfill";
import { Stack } from "expo-router";
import {
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
  PlusJakartaSans_800ExtraBold_Italic,
  useFonts,
} from "@expo-google-fonts/plus-jakarta-sans";
import "../global.css";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNotifications } from "react-native-notificated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { TickCircle } from "iconsax-react-native";
import { ConnectionProvider } from "@/providers/ConnectionProvider";
import { ClusterProvider } from "@/providers/cluster-data-access";

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const { NotificationsProvider, useNotifications, ...events } =
  createNotifications({
    defaultStylesSettings: {
      successConfig: {
        multiline: 1,
        defaultIconType: "color",
        borderType: "border",
        leftIconSource: <TickCircle size={20} color="green" />,
      },
    },
  });

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_300Light,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    PlusJakartaSans_800ExtraBold_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setIsLoading(false);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GluestackUIProvider mode="light">
          <QueryClientProvider client={queryClient}>
            <ClusterProvider>
              <ConnectionProvider config={{ commitment: "processed" }}>
                <Stack screenOptions={{ headerShown: false }} />
                <NotificationsProvider />
              </ConnectionProvider>
            </ClusterProvider>
          </QueryClientProvider>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </React.Fragment>
  );
}
