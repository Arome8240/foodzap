import { View, Pressable } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "iconsax-react-native";
import { router } from "expo-router";

export default function index() {
  return (
    <View className="relative flex-1 p-5 bg-white">
      <View className="flex-row items-center justify-between">
        <Pressable onPress={router.back}>
          <ArrowLeft size="24" color="#181718" />
        </Pressable>

        <Text className="text-xl font-jk-sans-semibold">Order Details</Text>

        <View></View>
      </View>
      <Pressable className="absolute left-0 right-0 items-center p-5 mx-5 bottom-24 bg-primary rounded-xl">
        <Text className="text-lg text-white font-jk-sans-semibold">
          Reorder Items
        </Text>
      </Pressable>
    </View>
  );
}
