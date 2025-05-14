import { View, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Text } from "./ui/text";
import { useConnection } from "@/providers/ConnectionProvider";
import { useAuthorization } from "@/hooks/useAuthorization";
import { useMobileWallet } from "@/hooks/useMobileWallet";
import { getProvider, initialize } from "@/utils/blockchain";
import { ellipsify } from "@/utils/ellipsify";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { ArrowDown2, Location, ShoppingCart } from "iconsax-react-native";

export default function Header() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const { connection } = useConnection();
  const { authorizeSession, selectedAccount } = useAuthorization();
  const { connect, disconnect } = useMobileWallet();

  useEffect(() => {
    console.log(selectedAccount);
  }, []);

  const handleConnectPress = useCallback(async () => {
    // if (authorizationInProgress) return;
    // setAuthorizationInProgress(true);

    try {
      await connect();
      console.log("done");
      // if (selectedAccount?.publicKey && authorizeSession && connection) {
      //   console.log(selectedAccount?.publicKey.toString());
      //   const program = getProvider(
      //     selectedAccount.publicKey,
      //     authorizeSession,
      //     connection.sendTransaction
      //   );
      //   if (program) {
      //     //initialize(program);
      //     setIsInitialized(true);
      //   }
      // }
    } catch (err) {
      console.error("Error during connect/initialize:", err);
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [
    authorizationInProgress,
    authorizeSession,
    connection,
    selectedAccount?.publicKey,
  ]);

  const handleDisconnect = useCallback(async () => {
    if (authorizationInProgress) return;
    setAuthorizationInProgress(true);

    try {
      await disconnect();
    } catch (err) {
      console.error("Error during disconnect:", err);
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress]);

  return (
    <View className="flex-row items-center justify-between gap-4">
      <Pressable className="flex-row items-center gap-2">
        <Location size="24" color="#4b5563" />
        <View>
          <Text className="text-lg text-gray-300">Delivering to</Text>
          <Text className="text-xl text-typography-700 font-jk-sans-semibold">
            Tina junction, Jos
          </Text>
        </View>
        <ArrowDown2 size="16" color="#4b5563" />
      </Pressable>

      <View className="flex-row items-center gap-3">
        <View className="relative">
          <ShoppingCart size="24" color="#f73905" />
          <View className="absolute items-center justify-center w-5 h-5 bg-red-500 rounded-full -top-2 -right-2">
            <Text className="text-white">1</Text>
          </View>
        </View>
        {selectedAccount ? (
          <Menu
            placement="top"
            offset={-25}
            disabledKeys={["Settings"]}
            trigger={({ ...triggerProps }) => {
              return (
                <Pressable
                  {...triggerProps}
                  className="p-3 border border-green-400 rounded-xl"
                >
                  <Text className="text-green-400">
                    {ellipsify(selectedAccount.publicKey.toString())}
                  </Text>
                </Pressable>
              );
            }}
          >
            <MenuItem
              onPress={handleConnectPress}
              key="Add account"
              textValue="Add account"
            >
              <MenuItemLabel size="sm">Change Address</MenuItemLabel>
            </MenuItem>
            <MenuItem
              onPress={handleDisconnect}
              key="Community"
              textValue="Community"
            >
              <MenuItemLabel className="text-red-500" size="sm">
                Disconnect
              </MenuItemLabel>
            </MenuItem>
          </Menu>
        ) : (
          <Pressable
            onPress={handleConnectPress}
            disabled={authorizationInProgress}
            className="p-3 bg-green-400 rounded-xl"
          >
            <Text className="text-white">Connect</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
