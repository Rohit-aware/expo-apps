import { IconSymbol } from "@/components/IconSymbol";
import { Text } from "@/components/Text";
import { appwriteConfig, tablesDB } from "@/utils/appwrite";
import { ChatRoom } from "@/utils/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

export default function Index() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await fetchChatRooms();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchChatRooms = async () => {
    try {
      //future usecase
      const { rows } = await tablesDB.listRows({
        databaseId: appwriteConfig.db,
        tableId: appwriteConfig.col.chatrooms,
        total: true
      });
      // Map the Document objects to ChatRoom objects
      const rooms = rows.map((doc) => ({
        id: doc.$id,
        title: doc.title,
        description: doc.description,
        isPrivate: doc.isPrivate,
        createdAt: new Date(doc.createdAt),
        updatedAt: new Date(doc.updatedAt),
      }));
      setChatRooms(rooms);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);


  return (
    <FlatList
      data={chatRooms}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      renderItem={({ item }) => {
        return (
          <Link
            href={{
              pathname: "/[chat]",
              params: { chat: item.id },
            }}
          >
            <View
              style={{
                gap: 6,
                padding: 16,
                width: "100%",
                borderRadius: 16,
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#262626",
                justifyContent: "space-between",
              }}
            >
              <ItemTitleAndDescription
                title={item.title}
                description={item.description}
                isPrivate={item.isPrivate}
              />
              <IconSymbol name="chevron.right" size={20} color="#666666" />
            </View>
          </Link>
        );
      }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
    />
  );
}

function ItemTitle({
  title,
  isPrivate,
}: {
  title: string;
  isPrivate: boolean;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <Text style={{ fontSize: 17 }}>{title}</Text>
      {isPrivate && <IconSymbol name="lock.fill" size={20} color="#666666" />}
    </View>
  );
}

function ItemTitleAndDescription({
  title,
  description,
  isPrivate,
}: {
  title: string;
  description: string;
  isPrivate: boolean;
}) {
  return (
    <View style={{ gap: 4 }}>
      <ItemTitle title={title} isPrivate={isPrivate} />
      <Text style={{ fontSize: 13, color: "#666666" }}>{description}</Text>
    </View>
  );
}
