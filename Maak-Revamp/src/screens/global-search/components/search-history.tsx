import React from 'react';
import { commonStyles } from '../../../styles';
import { TakeSpace } from '../../../components';
import fontStyles from '../../../styles/font-styles';
import { Colors, moderateScale } from '../../../constants';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';

type SearchHistoryPrps = { searches: Array<string>; onPress: (value: string) => void }

const Space6 = () => <TakeSpace space={6} />;

const SearchHistory = React.memo(({ searches, onPress }: SearchHistoryPrps) => {
    const renderRescentSerachs: ListRenderItem<string> = ({ item }) => {
        return (
            <Pressable style={styles.serachTxtCont} onPress={() => onPress(item)}>
                <Text style={styles.serachTxt}>{item}</Text>
                <Text style={styles.crossBtn}>{'X'}</Text>
            </Pressable>
        );
    };
    return (
        <View style={styles.container}>
            <TakeSpace />
            <Text style={styles.recentTxt}>Recent searches</Text>
            <TakeSpace space={6} />
            <FlatList
                horizontal
                data={searches}
                renderItem={renderRescentSerachs}
                contentContainerStyle={{ flex: 1 }}
                ItemSeparatorComponent={Space6}
                ListEmptyComponent={<Text style={styles.emptyText}>No search history </Text>}
            />
        </View>
    );
});

export default SearchHistory;

const styles = StyleSheet.create({
    recentTxt: { ...fontStyles.notoSansRegular12 },
    container: { height: moderateScale(70) },
    serachTxtCont: {
        ...commonStyles.RowJFSAC,
        borderRadius: moderateScale(20),
        backgroundColor: Colors.fadedSec,
        paddingVertical: moderateScale(4)
    },
    serachTxt: {
        ...fontStyles.notoSansRegular12,
        color: Colors.secColor,
        paddingLeft: moderateScale(10),
    },
    crossBtn: {
        ...fontStyles.notoSansBold10,
        color: Colors.secColor,
        paddingHorizontal: moderateScale(10),
    },
    emptyText: {
        ...fontStyles.notoSansMedium12,
        paddingLeft: 16
    },
});