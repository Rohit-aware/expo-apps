import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
}

interface Comment {
    id: string;
    user: string;
    text: string;
}

export const CommentsSheet: React.FC<Props> = ({ visible, onClose }) => {
    const [input, setInput] = useState('');

    const comments: Comment[] = [
        { id: '1', user: 'john', text: 'Nice reel 🔥' },
        { id: '2', user: 'alex', text: 'Love this!' },
    ];

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <Pressable style={styles.backdrop} onPress={onClose} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                <View style={styles.sheet}>
                    <View style={styles.handle} />

                    <Text style={styles.title}>Comments</Text>

                    <FlatList
                        data={comments}
                        keyExtractor={(i) => i.id}
                        renderItem={({ item }) => (
                            <View style={styles.commentRow}>
                                <Text style={styles.user}>{item.user}</Text>
                                <Text style={styles.text}>{item.text}</Text>
                            </View>
                        )}
                    />

                    <View style={styles.inputRow}>
                        <TextInput
                            placeholder="Add a comment..."
                            placeholderTextColor="#999"
                            value={input}
                            onChangeText={setInput}
                            style={styles.input}
                        />
                        <Pressable>
                            <Text style={styles.send}>Send</Text>
                        </Pressable>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: '#00000066' },

    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },

    sheet: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        padding: 14,
    },

    handle: {
        alignSelf: 'center',
        width: 45,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },

    title: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },

    commentRow: { marginBottom: 12 },

    user: { fontWeight: 'bold' },
    text: { color: '#333' },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#eee',
        paddingTop: 8,
    },

    input: { flex: 1, padding: 10 },

    send: { color: '#0095f6', fontWeight: 'bold', padding: 8 },
});