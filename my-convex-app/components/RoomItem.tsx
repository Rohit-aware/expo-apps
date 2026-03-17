import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    room: any;
    isActive: boolean;
    onPress: () => void;
    lastMessage?: string;
    unreadCount?: number;
};

export default function RoomItem({
    room,
    isActive,
    onPress,
    lastMessage,
    unreadCount = 0,
}: Readonly<Props>) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                styles.container,
                isActive && styles.activeContainer,
            ]}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {room.name.charAt(0).toUpperCase()}
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{room.name}</Text>

                {lastMessage && (
                    <Text
                        style={styles.preview}
                        numberOfLines={1}
                    >
                        {lastMessage}
                    </Text>
                )}
            </View>

            {unreadCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {unreadCount}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        backgroundColor: "#ffffff",
        borderRadius: 14,
        marginBottom: 10,
        elevation: 2,
    },
    activeContainer: {
        backgroundColor: "#e6f0ff",
        borderWidth: 1,
        borderColor: "#007AFF",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#007AFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    content: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 4,
    },
    preview: {
        fontSize: 13,
        color: "#666",
    },
    badge: {
        backgroundColor: "#ff3b30",
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 24,
        alignItems: "center",
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
});