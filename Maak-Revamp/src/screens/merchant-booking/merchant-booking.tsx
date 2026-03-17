import React from 'react';
import { SafeAreaInsect } from '../../hooks';
import { useMerchantBooking } from './use-merchBookin';
import { Colors, moderateScale } from '../../constants';
import { FlatList, StyleSheet, View } from 'react-native';
import { SearchIcon, YellowFilter } from '../../assets/icons';
import { BookingCard, BorderBottom, Header, InputField, TakeSpace } from '../../components';

const Icon = () => <SearchIcon color={Colors.black25} />;
const ItemSeparatorComponent = () => <BorderBottom />

const MerchantBooking = () => {

    const {
        search,
        onPress,
        onChangeText,
    } = useMerchantBooking();

    const renderItem = React.useCallback(() => {
        return (
            <View style={{ paddingHorizontal: moderateScale(16) }}>
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
                    data={[1, 2, 3, 4, 5]}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    contentContainerStyle={{ paddingHorizontal: moderateScale(16) }}
                    renderItem={({ item, index }) => <BookingCard {...{ item, index, onPress }} />}
                />
            </View>
        )
    }, [search])

    return <SafeAreaInsect
        data={[1]}
        renderItem={renderItem}
        ListFooterComponent={<TakeSpace space={20} />}
        ListHeaderComponent={<Header title='Merchant Bookings' subTitle={'Good Food'} />}
    />
}

export default MerchantBooking;

const styles = StyleSheet.create({
    searchCont: {
        borderColor: Colors.black25,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(60),
        backgroundColor: Colors.white10,
        paddingVertical: moderateScale(12),
        height: moderateScale(50),
    },
    sectListCont: { paddingHorizontal: moderateScale(16) },
    rootStyle: { width: '100%', paddingTop: moderateScale(10) },
})