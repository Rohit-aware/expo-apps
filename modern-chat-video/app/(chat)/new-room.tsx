import Input from "@/components/Input";
import { appwriteConfig, tablesDB } from "@/utils/appwrite";
import { Stack, router } from "expo-router";
import * as React from "react";
import { useState } from "react";
import { Button, View } from "react-native";
import { ID } from "react-native-appwrite";

export default function NewRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function createRoom() {
    try {
      setIsLoading(true);
      await tablesDB.createRow({
        databaseId: appwriteConfig.db,
        tableId: appwriteConfig.col.chatrooms,
        rowId: ID.unique(),
        data: {
          title: roomName,
          description: roomDescription,
          isPrivate: false,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      router.back();
    }
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title={isLoading ? "Creating..." : "Create"}
              onPress={createRoom}
              disabled={roomName.length === 0 || isLoading}
            />
          ),
        }}
      />
      <View style={{ padding: 16, gap: 16 }}>
        <Input
          placeholder="Room Name"
          placeholderTextColor={'white'}
          value={roomName}
          onChangeText={setRoomName}
          style={{ color: "white", }}
        />
        <Input
          placeholderTextColor={'white'}
          placeholder="Room Description"
          value={roomDescription}
          onChangeText={setRoomDescription}
          multiline
          numberOfLines={4}
          maxLength={100}
          style={{ height: 100, color: "white", }}
        />
      </View>
    </>
  );
}
