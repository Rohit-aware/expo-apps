import { Primary, Secondary } from "@/colors";
import { IconSymbol } from "@/components/IconSymbol";
import { Text } from "@/components/Text";
import { appwriteConfig, client, tablesDB } from "@/utils/appwrite";
import { ChatRoom, Message } from "@/utils/types";
import { useUser } from "@clerk/clerk-expo";
import { LegendList } from "@legendapp/list";
import { useHeaderHeight } from "@react-navigation/elements";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Pressable, TextInput, View } from "react-native";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

interface MessageItemProps {
  item: Message;
  userId?: string;
}

function MessageItem({ item, userId }: MessageItemProps) {
  const isSender = item.senderId === userId;
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 6,
        maxWidth: "80%",
        alignSelf: isSender ? "flex-end" : "flex-start",
      }}
    >
      {!isSender && (
        <Image
          source={{ uri: item.senderPhoto }}
          style={{ width: 30, height: 30, borderRadius: 15 }}
        />
      )}
      <View
        style={{
          backgroundColor: isSender ? "#007AFF" : "#161616",
          flex: 1,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "500", marginBottom: 4 }}>
          {item.senderName}
        </Text>
        <Text>{item.content}</Text>
        <Text
          style={{
            fontSize: 10,
            textAlign: "right",
          }}
        >
          {new Date(item.$createdAt!).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
}
export default function ChatRoomScreen() {
  const { chat: chatRoomId } = useLocalSearchParams();
  const { user } = useUser();
  const headerHeight = useHeaderHeight();
  const [messageContent, setMessageContent] = React.useState("");
  const [chatRoom, setChatRoom] = React.useState<ChatRoom | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const textInputRef = React.useRef<TextInput>(null);

  const listRef = React.useRef<any>(null);

  const getChatRoom = React.useCallback(async () => {
    try {
      const res = await tablesDB.getRow({
        databaseId: appwriteConfig.db,
        tableId: appwriteConfig.col.chatrooms,
        rowId: chatRoomId as string,
      });

      setChatRoom(res as unknown as ChatRoom);
    } catch (error) {
      console.error("getChatRoom error", error);
    }
  }, [chatRoomId]);

  const scrollToEnd = React.useCallback(() => {
    listRef.current?.scrollToEnd?.();
  }, [])


  const getMessages = React.useCallback(async () => {
    try {
      const res = await tablesDB.listRows({
        databaseId: appwriteConfig.db,
        tableId: appwriteConfig.col.messages,
        queries: [
          Query.equal("chatRoomId", chatRoomId),
          Query.orderAsc("$createdAt"),
          Query.limit(100),
        ],
      });

      setMessages(res.rows as unknown as Message[]);
    } catch (error) {
      console.error("getMessages error", error);
    }
  }, [chatRoomId]);


  const handleFirstLoad = React.useCallback(async () => {
    try {
      await getChatRoom();
      await getMessages();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getChatRoom, getMessages]);



  async function handleSendMessage() {
    if (!messageContent.trim() || !user) return;

    const message = {
      content: messageContent,
      senderId: user?.id!,
      senderName: user?.fullName ?? "Anonymous",
      senderPhoto: user?.imageUrl ?? "",
      chatRoomId: chatRoomId as string,
    };

    try {
      await tablesDB.createRow({
        databaseId: appwriteConfig.db,
        tableId: appwriteConfig.col.messages,
        rowId: ID.unique(),
        data: message,
        permissions: [
          Permission.read(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      });
      setMessageContent("");

      // Optional: update last message timestamp field YOU created
      await tablesDB.updateRow({
        databaseId: appwriteConfig.db,
        tableId: appwriteConfig.col.chatrooms,
        rowId: chatRoomId as string,
        data: { lastMessageAt: new Date().toISOString() },
        permissions: [
          Permission.read(Role.any()),
          Permission.update(Role.any()),
          Permission.delete(Role.any()),
        ]
      });

    } catch (error) {
      console.log("sendMessage error", error);
    }
  }



  const headerRight = () => (
    <Link
      href={{
        pathname: "/settings/[chat]",
        params: { chat: chatRoomId as string },
      }}
    >
      <IconSymbol name="gearshape" size={24} color={Primary} />
    </Link>
  );



  // Subscribe to messages
  React.useEffect(() => {
    const channel =
      `databases.${appwriteConfig.db}.collections.${appwriteConfig.col.messages}.documents`;
    const unsubscribe = client.subscribe(channel, (event) => {
      const payload = event.payload as Message;
      if (payload.chatRoomId !== chatRoomId) return;
      setMessages(prev => {
        const updated = [...prev, payload];
        requestAnimationFrame(scrollToEnd);
        return updated;
      });

    });

    return () => unsubscribe();
  }, [chatRoomId, scrollToEnd]);

  React.useEffect(() => {
    handleFirstLoad();
  }, [handleFirstLoad]);


  if (!chatRoomId) {
    return <Text>We couldnt find this chat room 🥲</Text>;
  }


  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: chatRoom?.title,
          headerRight: headerRight,
        }}
      />
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 0}
        >
          <LegendList
            ref={listRef}
            data={messages}
            renderItem={({ item }) => (
              <MessageItem item={item} userId={user?.id} />
            )}
            keyExtractor={(item) => item?.$id ?? "unknown"}
            contentContainerStyle={{ padding: 10 }}
            recycleItems={true}
            initialScrollIndex={messages.length - 1}
            alignItemsAtEnd // Aligns to the end of the screen, so if there's only a few items there will be enough padding at the top to make them appear to be at the bottom.
            maintainScrollAtEnd // prop will check if you are already scrolled to the bottom when data changes, and if so it keeps you scrolled to the bottom.
            maintainScrollAtEndThreshold={0.5} // prop will check if you are already scrolled to the bottom when data changes, and if so it keeps you scrolled to the bottom.
            maintainVisibleContentPosition //Automatically adjust item positions when items are added/removed/resized above the viewport so that there is no shift in the visible content.
            estimatedItemSize={100} // estimated height of the item
          // getEstimatedItemSize={(info) => { // use if items are different known sizes
          //   console.log("info", info);
          // }}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: Secondary,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 20,
              marginBottom: 6,
              marginHorizontal: 10,
            }}
          >
            <TextInput
              ref={textInputRef}
              placeholder="Type a message"
              style={{
                minHeight: 40,
                color: "white",
                flexShrink: 1, // prevent pushing the send button out of the screen
                flexGrow: 1, // allow the text input to grow keeping the send button to the right
                padding: 10,
              }}
              placeholderTextColor={"gray"}
              multiline
              value={messageContent}
              onChangeText={setMessageContent}
            />
            <Pressable
              style={{
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={handleSendMessage}
            >
              <IconSymbol
                name="paperplane"
                size={24}
                color={messageContent ? Primary : "gray"}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
