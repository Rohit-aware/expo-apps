import { FlatList, StyleSheet, Text } from 'react-native';

const DATA = Array.from({ length: 40 }, (_, i) => ({
  id: String(i),
  title: `List Item ${i + 1}`,
}));

export default function TabTwoScreen() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <Text style={styles.item}>{item.title}</Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 20,
  },
  item: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});
