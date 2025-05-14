import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { Forbidden2, SearchNormal1 } from "iconsax-react-native";

export default function browse() {
  const [searchText, setSearch] = useState("");
  return (
    <View className="flex-1 p-5 bg-white">
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
    </View>
  );
}
