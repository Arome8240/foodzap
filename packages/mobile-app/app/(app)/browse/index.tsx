import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Forbidden2, GlobalSearch, SearchNormal1 } from "iconsax-react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function browse() {
  const tabBarHeight = useBottomTabBarHeight();
  const [searchText, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  return (
    <View
      style={{
        marginBottom: tabBarHeight,
      }}
      className="flex-1 p-5 bg-white"
    >
      <View className="flex-row items-center gap-2 p-3 bg-gray-200 border border-gray-300 rounded-full">
        <SearchNormal1 size="16" color="#7b7c7e" />
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={setSearch}
          className="text-lg font-jk-sans-medium text-[#7b7c7e] flex-1"
        />
        {searchText && (
          <Pressable onPress={() => setSearch("")}>
            <Forbidden2 size="16" color="#7b7c7e" />
          </Pressable>
        )}
      </View>
      <View className="flex-1 mt-5">
        {searchResults.length > 0 ? (
          <View className="flex-1"></View>
        ) : (
          <NotFound />
        )}
      </View>
    </View>
  );
}

const NotFound = () => {
  return (
    <View className="items-center justify-center flex-1">
      <GlobalSearch size="64" color="#7b7c7e" />
      <Text className="text-lg font-jk-sans-semibold text-typography-700">
        No results found
      </Text>
      <Text className="mt-2 text-sm font-jk-sans-regular text-typography-500">
        Try searching for something else
      </Text>
    </View>
  );
};
