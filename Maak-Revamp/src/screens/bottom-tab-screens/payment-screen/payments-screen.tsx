import React from 'react';
import { SafeAreaInsect } from '../../../hooks';
import PaymentsCard from './components/payment-card';
import { Colors, moderateScale } from '../../../constants';
import RenderSectionHeader from './components/section-header';
import { SearchIcon, YellowFilter } from '../../../assets/icons';
import { ListRenderItem, SectionList, StyleSheet, Text, View } from 'react-native';
import { Header, InputField, TakeSpace } from '../../../components';
import { TransactionItem, TransactionSection, useMyPayment } from './use-payment';

const BottomSheet = React.lazy(() => import('../../../components').then((e) => ({ default: e.BottomSheet })));

const Icon = () => <SearchIcon color={Colors.black25} />;
const Space3 = () => <TakeSpace space={3} />;
const Space8 = () => <TakeSpace space={8} />;

const Payments = () => {

    const {
        show,
        search,
        showMdal,
        hideMdal,
        transaction,
        onChangeText,
    } = useMyPayment();

    const renderItem: ListRenderItem<TransactionItem> =
        React.useCallback(({ item }) => (
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
                <SectionList<TransactionItem, TransactionSection>
                    sections={transaction}
                    ListFooterComponent={TakeSpace}
                    ItemSeparatorComponent={Space3}
                    SectionSeparatorComponent={Space8}
                    renderSectionHeader={RenderSectionHeader}
                    contentContainerStyle={styles.sectListCont}
                    renderItem={({ index, item }) => <PaymentsCard item={item} index={index} onPress={showMdal} />}
                />
                {show && (
                    <BottomSheet show={show} hide={hideMdal}  >
                        <View>
                            <Text>Valid content here</Text>
                        </View>
                    </BottomSheet>
                )}
            </View>
        ), [search]);

    return <SafeAreaInsect
        data={[1]}
        scrollEnabled={false}
        renderItem={renderItem}
        ListHeaderComponent={<Header title='My payments' showArrow={false} />}
    />
};

export default Payments;

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
});