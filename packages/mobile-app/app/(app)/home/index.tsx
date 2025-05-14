import { View, Text, Pressable, ScrollView, Image } from "react-native";
import React from "react";
import { createNotifications } from "react-native-notificated";
import { TickCircle } from "iconsax-react-native";
import Header from "@/components/Header";
import { Link } from "expo-router";

const { NotificationsProvider, useNotifications, ...events } =
  createNotifications();

export default function index() {
  const { notify } = useNotifications();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View className="flex-1 p-5 bg-white">
      <Header />

      <View className="relative w-full h-40 mt-8 bg-red-500 rounded-xl">
        <Image
          className="flex-1 w-full bg-[#0553] rounded-xl absolute h-40"
          source={require("@/assets/categories/banner.jpg")}
        />
        <View
          className="absolute inset-0 w-full h-40 bg-black rounded-xl"
          style={{ opacity: 0.2 }}
        />
        <View className="flex justify-center h-full gap-2 p-3">
          <View>
            <Text className="text-3xl text-primary font-jk-sans-bold">
              Get 50% Discount
            </Text>
            <Text className="text-2xl text-white">On all first orders</Text>
          </View>

          <View className="flex-row">
            <Link asChild href={"/orders"}>
              <Pressable
                android_ripple={{ color: "#ff7736" }}
                className="p-2 border rounded-md border-primary"
              >
                <Text className="text-primary">Learn More</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>

      <View className="mt-10">
        <Text className="text-2xl text-typography-700 font-jk-sans-semibold">
          Explore
        </Text>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="mt-5"
        >
          <View className="flex-row gap-x-4">
            <View className="items-center justify-center w-32 h-20 bg-orange-300 rounded-xl">
              <Image
                className="w-16 h-16"
                source={require("@/assets/categories/appetizers.png")}
              />
            </View>
            <View className="items-center justify-center w-32 h-20 bg-green-300 rounded-xl">
              <Image
                className="w-16 h-16"
                source={require("@/assets/categories/side-dishes.png")}
              />
            </View>
            <View className="items-center justify-center w-32 h-20 bg-pink-300 rounded-xl">
              <Image
                className="w-16 h-16"
                source={require("@/assets/categories/pasta.png")}
              />
            </View>
            <View className="items-center justify-center w-32 h-20 bg-blue-300 rounded-xl">
              <Image
                className="w-16 h-16"
                source={require("@/assets/categories/soup.png")}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <View className="mt-10">
        <Text className="text-2xl text-typography-700 font-jk-sans-semibold">
          Restaurants
        </Text>

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
