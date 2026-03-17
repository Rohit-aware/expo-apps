import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import { api } from "@/convex/_generated/api";
import { useChatStore } from "@/store/chatStore";
import { useQuery } from "convex/react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
    const { selectedRoom } = useChatStore();

    const messages = useQuery(
        api.messages.list,
        selectedRoom ? { roomId: selectedRoom._id } : "skip"
    );

    if (!selectedRoom) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>Select a room</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages || []}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <MessageBubble message={item} />
                )}
            />

            <MessageInput roomId={selectedRoom._id} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f6f8",
    },
    listContent: {
        padding: 12,
        paddingBottom: 80,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
    },
});