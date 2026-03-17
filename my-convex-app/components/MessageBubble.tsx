import { StyleSheet, Text, View } from "react-native";

export default function MessageBubble({ message }: any) {
    const isMe = message.author.startsWith("User");

    return (
        <View
            style={[
                styles.wrapper,
                isMe ? styles.alignRight : styles.alignLeft,
            ]}
        >
            <View
                style={[
                    styles.bubble,
                    isMe ? styles.myBubble : styles.otherBubble,
                ]}
            >
                {!isMe && (
                    <Text style={styles.author}>
                        {message.author}
                    </Text>
                )}
                <Text style={styles.text}>{message.body}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 12,
        maxWidth: "80%",
    },
    alignRight: {
        alignSelf: "flex-end",
    },
    alignLeft: {
        alignSelf: "flex-start",
    },
    bubble: {
        padding: 12,
        borderRadius: 16,
    },
    myBubble: {
        backgroundColor: "#007AFF",
        borderBottomRightRadius: 4,
    },
    otherBubble: {
        backgroundColor: "#e5e5ea",
        borderBottomLeftRadius: 4,
    },
    author: {
        fontSize: 12,
        fontWeight: "600",
        marginBottom: 4,
        color: "#444",
    },
    text: {
        fontSize: 15,
        color: "#000",
    },
});