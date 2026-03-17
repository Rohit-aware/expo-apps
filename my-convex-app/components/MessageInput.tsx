import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function MessageInput({ roomId }: Readonly<{ roomId: any }>) {
    const sendMessage = useMutation(api.messages.send);
    const [text, setText] = useState("");
    const name = "User" + Math.floor(Math.random() * 1000);

    const handleSend = () => {
        if (!text.trim()) return;

        sendMessage({
            body: text,
            author: name,
            roomId,
        });

        setText("");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={90}
        >
            <View style={styles.container}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message..."
                    style={styles.input}
                />

                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderColor: "#ddd",
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: "#f1f1f1",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 14,
        marginRight: 8,
    },
    sendBtn: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
    },
    sendText: {
        color: "#fff",
        fontWeight: "600",
    },
});