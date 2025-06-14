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
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View, Platform } from "react-native";
import { createNotifications } from "react-native-notificated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { TickCircle } from "iconsax-react-native";

//Blockchain Providers
import { ConnectionProvider } from "@/providers/ConnectionProvider";
import { ClusterProvider } from "@/providers/cluster-data-access";

//Deep Linking
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Linking from "expo-linking";

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
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

    Linking.openURL("/orders/1");

    registerForPushNotificationsAsync().then(
      (token) => token && console.log(token)
    );

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const url = response.notification.request.content.data.url;
        if (url) Linking.openURL(url);
      }
    );

    // Handle notification when app is opened from background/closed
    const handleInitialNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      const url = response?.notification.request.content.data.url;
      if (url) Linking.openURL(url);
    };
    handleInitialNotification();

    return () => subscription.remove();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // useEffect(() => {
  //   // registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));
  //   // Handle notification when app is in foreground
  // }, []);

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

async function registerForPushNotificationsAsync() {
  let token;

  // if (Platform.OS === "android") {
  //   await Notifications.setNotificationChannelAsync("myNotificationChannel", {
  //     name: "A channel is needed for the permissions prompt to appear",
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: "#FF231F7C",
  //   });
  // }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId = "8e75e63d-0717-4033-be2d-bea38b19b739";
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      console.log("Project ID:", projectId);
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
