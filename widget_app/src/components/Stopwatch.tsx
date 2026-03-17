import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { formatTime } from "../utils/formatTime";
import { useStopwatch } from "../hook/useStopWatch";

const Stopwatch = () => {
    const { time, laps, start, pause, reset, saveLap, deleteLap } = useStopwatch();

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{formatTime(time)}</Text>

            <View style={styles.buttons}>
                <Button title="Start" onPress={start} />
                <Button title="Pause" onPress={pause} />
                <Button title="Lap" onPress={saveLap} />
                <Button title="Reset" onPress={reset} />
            </View>

            <FlatList
                data={laps}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.lapItem}>
                        <Text>{formatTime(item.time)}</Text>
                        <Button title="Delete" onPress={() => deleteLap(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default Stopwatch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    timer: {
        fontSize: 48,
        textAlign: "center",
        marginBottom: 20,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    lapItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
    },
});