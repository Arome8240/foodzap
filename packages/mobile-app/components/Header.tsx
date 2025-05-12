import { View, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import { Text } from "./ui/text";
import { useConnection } from "@/providers/ConnectionProvider";
import { useAuthorization } from "@/hooks/useAuthorization";
import { useMobileWallet } from "@/hooks/useMobileWallet";
import { getProvider, initialize } from "@/utils/blockchain";
import { ellipsify } from "@/utils/ellipsify";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";

export default function Header() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const { connection } = useConnection();
  const { authorizeSession, selectedAccount } = useAuthorization();
  const { connect, disconnect } = useMobileWallet();

  const handleConnectPress = useCallback(async () => {
    if (authorizationInProgress) return;
    setAuthorizationInProgress(true);

    try {
      await transact(async (wallet) => {
        await authorizeSession(wallet);
      });
      // await connect();
      // if (selectedAccount?.publicKey && authorizeSession && connection) {
      //   const program = getProvider(
      //     selectedAccount.publicKey,
      //     authorizeSession,
      //     connection.sendTransaction
      //   );
      //   if (program) {
      //     initialize(program);
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
    <View className="flex-row justify-end">
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
            <MenuItemLabel color="red" className="text-red-500" size="sm">
              Disconnect
            </MenuItemLabel>
          </MenuItem>
        </Menu>
      ) : (
        <Pressable
          onPress={handleDisconnect}
          disabled={authorizationInProgress}
          className="p-3 bg-green-400 rounded-xl"
        >
          <Text className="text-white">Connect</Text>
        </Pressable>
      )}
    </View>
  );
}
