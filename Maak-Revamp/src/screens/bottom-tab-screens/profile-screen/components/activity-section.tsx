import React from 'react';
import { Colors } from '../../../../constants';
import { commonStyles } from '../../../../styles';
import { TakeSpace } from '../../../../components';
import fontStyles from '../../../../styles/font-styles';
import { FlatList, ListRenderItem, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SavingWallet, TransactionWallet } from '../../../../assets/icons';
import moderateScale, { SCREEN_HEIGHT } from '../../../../constants/responsive';

interface TransactionDetailProps { icon: React.ReactElement; title: string; amount: string; style: ViewStyle; };
interface WeekDataType { id: number, value: number; label: 'S' | 'M' | 'T' | 'W' | 'T' | 'F' | 'S' }

const TransactionDetail: React.FC<TransactionDetailProps> = React.memo(
    ({ icon, title, amount, style }) => (
        <View style={style}>
            {icon}
            <TakeSpace />
            <Text style={styles.transactionTxt}>{title}</Text>
            <Text style={styles.egpTxt}>{amount}</Text>
        </View>
    )
);


const WeekData: WeekDataType[] = [
    { id: 1, label: 'S', value: 10 },
    { id: 2, label: 'M', value: 10 },
    { id: 3, label: 'T', value: 10 },
    { id: 4, label: 'W', value: 10 },
    { id: 5, label: 'T', value: 10 },
    { id: 6, label: 'F', value: 10 },
    { id: 7, label: 'S', value: 10 },
];

const renderWeek: ListRenderItem<WeekDataType> =
    ({ item, index }) => {
        return (
            <View style={commonStyles.columnJFSAC}>
                <View style={styles.barStyle} />
                <Text style={styles.weekDay}>{item.label}</Text>
            </View>
        );
    };

const ActivitySection = () => {
    return (
        <>
            <TakeSpace />
            <View style={commonStyles.RowJFSAC}>
                <View style={styles.leftCont}>
                    <Text style={styles.transactionTxt}>Total transaction</Text>
                    <Text style={styles.egpTxt}>EGP 23374829346726</Text>
                    <TakeSpace space={26}/>
                    <FlatList
                        numColumns={7}
                        data={WeekData}
                        renderItem={renderWeek}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                </View>
                <TakeSpace space={4} />
                <View style={styles.rightCont}>
                    <TransactionDetail
                        icon={<TransactionWallet />}
                        title="Amount of transaction"
                        amount="EGP 1000000095.71"
                        style={styles.transactionCont}
                    />
                    <TransactionDetail
                        icon={<SavingWallet />}
                        title="Total Savings"
                        amount="EGP 1000000095.71"
                        style={styles.savingCont}
                    />
                </View>
            </View>
            <TakeSpace />
        </>
    );
};


const styles = StyleSheet.create({
    rightCont: { flex: 1, gap: moderateScale(10) },
    leftCont: {
        flex: 1,
        padding: moderateScale(10),
        height: SCREEN_HEIGHT * 0.3,
        borderRadius: moderateScale(10),
        backgroundColor: Colors.fadedSuccess,
    },
    transactionCont: {
        padding: moderateScale(10),
        height: SCREEN_HEIGHT * 0.145,
        borderRadius: moderateScale(10),
        backgroundColor: Colors.fadedWarnign,
    },
    savingCont: {
        padding: moderateScale(10),
        height: SCREEN_HEIGHT * 0.145,
        borderRadius: moderateScale(10),
        backgroundColor: Colors.fadedPurple,
    },
    transactionTxt: { ...fontStyles.notoSansRegular10 },
    egpTxt: { ...fontStyles.notoSansBold14 },
    barStyle: {
        width: moderateScale(10),
        height: moderateScale(100),
        borderRadius: moderateScale(16),
        backgroundColor: Colors.success,
    },
    weekDay: { ...fontStyles.notoSansMedium10, fontSize: moderateScale(8) },
    columnWrapper: { columnGap: moderateScale(12), alignSelf: 'center' }
});

export default ActivitySection;