import React from 'react';
import { InputField } from '../../../../components';
import fontStyles from '../../../../styles/font-styles';
import { Colors, moderateScale } from '../../../../constants';
import { ForwardArrow, MyWallet } from '../../../../assets/icons';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
type ManageURMoneyProps = {
    data: Array<any>;
}

const Size16 = moderateScale(16);


const renderItem: ListRenderItem<{}> = ({ item, index }) => {
    return (
        <InputField
            editable={false}
            Icon={MyWallet}
            value='My Wallet'
            rightIcon={ForwardArrow}
            onPressIcon={() => { }}
            inputTxtStyle={styles.inputText}
            textContinerStyle={styles.textCont}
            rootStyle={{ width: '100%', borderColor: Colors.lightBlackBorder }}
        />
    )
}

const ManageURMoney = ({ data }: ManageURMoneyProps) => {

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            style={{ paddingVertical: Size16 }}
        />
    );
};

export default ManageURMoney;
const styles = StyleSheet.create({
    inputText: { ...fontStyles.notoSansMedium14, paddingLeft: moderateScale(10) },
    textCont: { paddingVertical: moderateScale(10), paddingLeft: moderateScale(10) },
});