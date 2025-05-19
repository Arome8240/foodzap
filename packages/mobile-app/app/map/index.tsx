import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { Fragment, useRef, useState } from "react";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  UrlTile,
  Polyline,
} from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { X } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function index() {
  const [origin, setOrigin] = useState({
    latitude: 9.920291099999998,
    longitude: 8.9129145,
  });

  const [isFocused, setIsFocused] = useState(false);

  const mapRef = useRef<MapView | null>(null);
  return (
    <Fragment>
      <MapView
        style={StyleSheet.absoluteFillObject}
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        loadingEnabled={true}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* User's current location marker */}
        {origin && (
          <Marker
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
            title="You are here"
          />
        )}
      </MapView>
      <SafeAreaView
        style={{ flex: 1 }}
        className="p-4"
        pointerEvents="box-none"
      >
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="always"
        >
          <View className="flex-row">
            <Pressable
              onPress={router.back}
              className="p-2 bg-white rounded-full"
            >
              <X color={"#181718"} />
            </Pressable>
          </View>
          <View className="mt-3">
            <GooglePlacesAutocomplete
              query={{
                key: "AIzaSyCI0hLg8w1fBvNnJDDxlI41mYKi1stFnM0",
                language: "en",
              }}
              GooglePlacesDetailsQuery={{ fields: "geometry" }}
              listViewDisplayed={false}
              fetchDetails={true}
              enablePoweredByContainer={false}
              placeholder="Address"
              nearbyPlacesAPI="GooglePlacesSearch"
              onPress={(data, details = null) => {
                console.log(
                  data.description,
                  details?.geometry.location.lat,
                  details?.geometry.location.lng
                );
                setOrigin({
                  latitude: details?.geometry.location.lat,
                  longitude: details?.geometry.location.lng,
                });
              }}
              styles={{
                textInput: {
                  backgroundColor: "#fff",
                  color: "gray",
                  borderWidth: isFocused ? 2 : 0,
                  borderColor: isFocused ? "#333333" : "",
                  borderRadius: 50,
                  padding: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 1.0,
                  elevation: 1,
                },
                listView: {
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginTop: 5,
                },
              }}
              textInputProps={{
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
              }}
            />
          </View>

          <Actionsheet>
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>
              <ActionsheetItem>
                <ActionsheetItemText />
              </ActionsheetItem>
            </ActionsheetContent>
          </Actionsheet>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
}
