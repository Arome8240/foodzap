import { View, Text, Pressable } from "react-native";
import React from "react";
import { createNotifications } from "react-native-notificated";
import { TickCircle } from "iconsax-react-native";
import Header from "@/components/Header";

const { NotificationsProvider, useNotifications, ...events } =
  createNotifications();

export default function index() {
  const { notify } = useNotifications();
  return (
    <View className="flex-1 p-5 bg-white">
      <Header />
    </View>
  );
}
