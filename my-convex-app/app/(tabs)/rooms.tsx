import { api } from "@/convex/_generated/api";
import { useChatStore } from "@/store/chatStore";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function RoomsScreen() {
    const rooms = useQuery(api.rooms.list);
    const createRoom = useMutation(api.rooms.create);
    const { setSelectedRoom } = useChatStore();
    const router = useRouter();

    const [roomName, setRoomName] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Rooms</Text>

            <FlatList
                data={rooms || []}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.room}
                        onPress={() => {
                            setSelectedRoom(item);
                            router.push("/chat");
                        }}
                    >
                        <Text style={styles.roomText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.create}>
                <TextInput
                    value={roomName}
                    onChangeText={setRoomName}
                    placeholder="New room"
                    style={styles.input}
                />
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={async () => {
                        if (!roomName.trim()) return;
                        await createRoom({ name: roomName });
                        setRoomName("");
                    }}
                >
                    <Text style={{ color: "#fff" }}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    room: {
        padding: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginBottom: 10,
    },
    roomText: { fontSize: 16 },
    create: {
        flexDirection: "row",
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginRight: 8,
    },
    addBtn: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: "center",
    },
});