import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet } from "react-native";
import {
  Home,
  Profile,
  Car,
  ReceiptSearch,
  Receipt1,
  More2,
  SearchNormal,
} from "iconsax-react-native";
import Header from "@/components/Header";

export default function AppLayout() {
  const insets = useSafeAreaInsets();
  const orderNumner = 10;
  return (
    <Tabs
      safeAreaInsets={{ bottom: insets.bottom }}
      backBehavior="none"
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        animation: "shift",
        tabBarActiveTintColor: "#f73905",
        tabBarInactiveTintColor: "#999999",
        header: () => <Header />,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          ...styles.tabBarStyle,
          paddingBottom: insets.bottom,
        },
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ color: "transparent" }} />
        ),
        tabBarLabelStyle: {
          fontFamily: "PlusJakartaSans_500Medium",
          fontSize: 11,
        },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home strokeWidth={1.5} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <SearchNormal strokeWidth={1.5} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarBadge: orderNumner >= 1 ? orderNumner : undefined,
          tabBarIcon: ({ color, size }) => (
            <Receipt1 strokeWidth={1.5} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size }) => (
            <More2 strokeWidth={1.5} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    paddingTop: 10,
    height: 72,
    position: "absolute",
    elevation: 0,
    backgroundColor: "white",
  },
});
