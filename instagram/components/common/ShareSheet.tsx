import React from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const ShareSheet: React.FC<Props> = ({ visible, onClose }) => {
    const users = ['John', 'Alex', 'Sarah', 'Mike'];

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <Pressable style={styles.backdrop} onPress={onClose} />

            <View style={styles.container}>
                <View style={styles.sheet}>
                    <View style={styles.handle} />

                    <Text style={styles.title}>Share</Text>

                    <FlatList
                        horizontal
                        data={users}
                        keyExtractor={(i) => i}
                        renderItem={({ item }) => (
                            <View style={styles.user}>
                                <View style={styles.avatar} />
                                <Text>{item}</Text>
                            </View>
                        )}
                    />

                    <Pressable style={styles.copyBtn}>
                        <Text style={{ fontWeight: 'bold' }}>Copy Link</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: '#00000066' },

    container: { position: 'absolute', bottom: 0, width: '100%' },

    sheet: {
        height: 260,
        backgroundColor: 'white',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        padding: 16,
    },

    handle: {
        alignSelf: 'center',
        width: 45,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#ccc',
        marginBottom: 10,
    },

    title: { fontWeight: 'bold', fontSize: 16, marginBottom: 14 },

    user: { alignItems: 'center', marginRight: 18 },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ddd',
        marginBottom: 6,
    },

    copyBtn: {
        marginTop: 18,
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#eee',
        alignItems: 'center',
    },
});