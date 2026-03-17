import React from 'react';
import { SafeAreaInsect } from '../../hooks';
import { useMyBooking } from './use-my-booking';
import { Colors, moderateScale } from '../../constants';
import { SearchIcon, YellowFilter } from '../../assets/icons';
import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import { BookingCard, BorderBottom, Header, InputField, TakeSpace } from '../../components';

const Icon = () => <SearchIcon color={Colors.black25} />;

const MyBooking = () => {

    const {
        search,
        onChangeText,
    } = useMyBooking();

    const renderItem: ListRenderItem<any> = React.useCallback(({ index, item }) => {
        return (
            <>
                <InputField
                    value={search}
                    rightIcon={YellowFilter}
                    placeholder='Search here'
                    onChangeText={onChangeText}
                    rootStyle={styles.rootStyle}
                    cursorColor={Colors.black50}
                    textContinerStyle={styles.searchCont}
                    placeholderTextColor={Colors.black25}
                    Icon={Icon}
                />
                <TakeSpace space={6} />
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={BorderBottom}
                    contentContainerStyle={{ paddingHorizontal: moderateScale(16) }}
                    renderItem={({ item, index }) => <BookingCard {...{ item, index }} />}
                />
            </>
        )
    }, [])

    return (
        <SafeAreaInsect
            data={[1]}
            renderItem={renderItem}
            ListHeaderComponent={<Header title='My Bookings' />}
        />

    )
}

export default MyBooking;

const styles = StyleSheet.create({
    searchCont: {
        borderColor: Colors.black25,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(60),
        backgroundColor: Colors.white10,
        paddingVertical: moderateScale(12),
    },
    sectListCont: { paddingHorizontal: moderateScale(16) },
    rootStyle: { width: '92%', paddingTop: moderateScale(10) },
})