import React from 'react';
import { SafeAreaInsect } from '../../hooks';
import { Colors, moderateScale } from '../../constants';
import { FlatList, StyleSheet, View } from 'react-native';
import { useMerchantBooking } from './use-merchant-payment';
import { SearchIcon, YellowFilter } from '../../assets/icons';
import MerchatPaymentsCard from './components/merch-payment-card'
import { Header, InputField, TakeSpace } from '../../components';
import { commonStyles } from '../../styles';

const Icon = () => <SearchIcon color={Colors.black25} />;

const MerchantPayment = () => {

    const {
        search,
        onPress,
        onChangeText,
    } = useMerchantBooking();

    const renderItem = () => {
        return (
            <View style={commonStyles._horizonatalSpace(16)}>
                <InputField
                    Icon={Icon}
                    value={search}
                    rightIcon={YellowFilter}
                    placeholder='Search here'
                    onChangeText={onChangeText}
                    rootStyle={styles.rootStyle}
                    cursorColor={Colors.black50}
                    textContinerStyle={styles.searchCont}
                    placeholderTextColor={Colors.black25}
                />
                <TakeSpace space={6} />
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={commonStyles.flexGrow}
                    renderItem={({ item, index }) => <MerchatPaymentsCard {...{ item, index, onPress }} />}
                />
            </View>
        )
    }

    return <SafeAreaInsect
        data={[1]}
        renderItem={renderItem}
        ListHeaderComponent={<Header title='Merchant Payment' />}
    />
}

export default MerchantPayment;

const styles = StyleSheet.create({
    searchCont: {
        borderColor: Colors.black25,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(60),
        backgroundColor: Colors.white10,
    },
    sectListCont: { paddingHorizontal: moderateScale(16) },
    rootStyle: { width: '100%', paddingTop: moderateScale(10) },
})