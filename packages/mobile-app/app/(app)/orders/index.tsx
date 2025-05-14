import { Pressable, ScrollView, View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import { ReceiptEdit } from "iconsax-react-native";
import { Link } from "expo-router";

export default function orders() {
  const myOrders = Array.from({ length: 4 });
  return (
    <View className="flex-1 p-5 bg-white">
      <View>
        <Text className="text-xl text-center text-typography-700 font-jk-sans-semibold">
          Your Orders
        </Text>
      </View>

      <View className="flex-row gap-2 pb-3 mt-5">
        <Pressable className="p-3 rounded-full bg-scarlet-100">
          <Text className="text-primary font-jk-sans-semibold">New Orders</Text>
        </Pressable>
        <Pressable className="p-3 border border-gray-300 rounded-full">
          <Text className=" font-jk-sans-semibold text-typography-700">
            Past Orders
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 pb-20 mt-5">
          {myOrders.map((order, index) => (
            <View key={index} className="p-4 border border-gray-300 rounded-xl">
              <View className="flex-row gap-4">
                <View className="items-center justify-center w-16 h-16 bg-red-500 rounded-lg">
                  <ReceiptEdit size="32" color="#fff" />
                </View>
                <View>
                  <Text className="text-xl text-typography-700 font-jk-sans-bold">
                    QuickMart
                  </Text>
                  <Text className="text-typography-500">1 item</Text>
                  <Text className="text-typography-500">
                    Cancelled: Mar 11, 2025 09:25
                  </Text>
                </View>
              </View>
              <View className="flex-row gap-2 mt-5">
                <Link href="/orders/1" asChild>
                  <Pressable className="flex-1 p-3 border border-gray-300 rounded-lg">
                    <Text className="text-center text-typography-700 font-jk-sans-semibold">
                      View Details
                    </Text>
                  </Pressable>
                </Link>
                <Pressable className="flex-1 p-3 rounded-lg bg-primary">
                  <Text className="text-center text-white font-jk-sans-semibold">
                    Reorder
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
