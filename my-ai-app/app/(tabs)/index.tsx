import { generateAPIUrl } from '@/utils';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { fetch as expoFetch } from 'expo/fetch';
import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
    const [input, setInput] = useState('');

    const { messages, error, sendMessage } = useChat({
        transport: new DefaultChatTransport({
            fetch: expoFetch as unknown as typeof globalThis.fetch,
            api: generateAPIUrl('/api/chat'),
        }),
        onError: error => console.error(error, 'ERROR'),
    });

    if (error) return <Text>{error.message}</Text>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 8 }}>
                <ScrollView style={{ flex: 1 }}>
                    {messages.map(m => (
                        <View key={m.id} style={{ marginVertical: 8 }}>
                            <Text style={{ fontWeight: "700" }}>{m.role}</Text>

                            {m.parts.map((part, i) =>
                                part.type === "text" ? (
                                    <Text key={`${m.id}-${i}`}>{part.text}</Text>
                                ) : null
                            )}
                        </View>
                    ))}
                </ScrollView>

                <TextInput
                    style={{ backgroundColor: "white", padding: 10, borderRadius: 6 }}
                    placeholder="Ask something..."
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={() => {
                        if (!input.trim()) return;
                        sendMessage({ text: input });
                        setInput('');
                    }}
                />
            </View>
        </SafeAreaView>
    );
}