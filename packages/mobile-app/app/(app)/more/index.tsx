import { View } from "react-native";
import React from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Text } from "@/components/ui/text";
import { useAuthorization } from "@/hooks/useAuthorization";
import { ellipsify } from "@/utils/ellipsify";

export default function more() {
  const tabBarHeight = useBottomTabBarHeight();
  const { selectedAccount } = useAuthorization();
  return (
    <View
      style={{
        marginBottom: tabBarHeight,
      }}
      className="flex-1 p-5 bg-white"
    >
      <View className="flex-row items-center border-b p-3 border-typography-200">
        <Text className="text-typography-700 font-jk-sans-semibold text-xl">
          User:{" "}
        </Text>
        <Text className="text-typography-700 font-jk-sans-semibold text-xl">
          {ellipsify(
            selectedAccount?.publicKey.toString() || "No Wallet Connected"
          )}
        </Text>
      </View>
    </View>
  );
}
