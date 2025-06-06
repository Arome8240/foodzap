import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
        headerShown: false,
        animationDuration: 4000,
      }}
    />
  );
}
