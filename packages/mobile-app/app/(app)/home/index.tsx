import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React from "react";
import { createNotifications } from "react-native-notificated";
import { TickCircle } from "iconsax-react-native";
import Header from "@/components/Header";

const { NotificationsProvider, useNotifications, ...events } =
  createNotifications();

export default function index() {
  const { notify } = useNotifications();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View className="flex-1 p-5 bg-white">
      <Header />

      <View className="relative w-full h-40 mt-8 rounded-xl">
        <Image
          className="flex-1 w-full bg-[#0553] mt-5 rounded-xl"
          source={require("@/assets/categories/banner.jpg")}
          //placeholder={{ blurhash }}
          //contentFit="cover"
          // transition={1000}
        />
        <View
          className="absolute w-full h-full bg-black rounded-xl"
          style={{ opacity: 0.2 }}
        >
          <View style={{ zIndex: 10 }}>
            <Text className="text-white">Hi</Text>
            <Text className="text-white">Hi</Text>
            <Text className="text-white">Hi</Text>
            <Text className="text-white">Hi</Text>
            <Text className="text-white">Hi</Text>
          </View>
        </View>
      </View>

      <View className="mt-10">
        <Text className="text-2xl font-jk-sans-semibold">Explore</Text>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="mt-5"
        >
          <View className="flex-row gap-x-4">
            <View className="w-32 h-20 bg-orange-300 rounded-xl"></View>
            <View className="w-32 h-20 bg-green-300 rounded-xl"></View>
            <View className="w-32 h-20 bg-pink-300 rounded-xl"></View>
            <View className="w-32 h-20 bg-blue-300 rounded-xl"></View>
          </View>
        </ScrollView>
      </View>

      <View className="mt-10">
        <Text className="text-2xl font-jk-sans-semibold">Restaurants</Text>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="mt-5"
        >
          <View className="flex-row gap-x-4">
            <View className="w-20 h-20 bg-orange-300 rounded-xl"></View>
            <View className="w-20 h-20 bg-green-300 rounded-xl"></View>
            <View className="w-20 h-20 bg-pink-300 rounded-xl"></View>
            <View className="w-20 h-20 bg-blue-300 rounded-xl"></View>
            <View className="w-20 h-20 bg-orange-300 rounded-xl"></View>
            <View className="w-20 h-20 bg-green-300 rounded-xl"></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
