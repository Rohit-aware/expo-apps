import React from 'react';
import { commonStyles } from '../../styles';
import { SafeAreaInsect } from '../../hooks';
import { PartySvg } from '../../assets/icons';
import fontStyles from '../../styles/font-styles';
import { HeaderCard, TextTile } from './components';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, moderateScale } from '../../constants';
import { BorderBottom, Header, TakeSpace } from '../../components';

type CommonProps = { label?: string; }

const HeaderTile = React.memo<CommonProps>(
    ({ label }) => (
        <Text style={styles.headerTxt}>{label}</Text>
    )
);

const MerchBookingDetails = () => {

    const renderBookingDetails = () => {
        return (
            <View style={styles.container}>
                <HeaderCard />
                <BorderBottom />
                <HeaderTile label='Booking Details' />
                <TextTile label='Service Name' value='General Medicine Bookings' />
                <TextTile label='Service Date' value='28th August 2024' />
                <TextTile label='Timeslot' value='8 am to 11:00 pm' />
                <TextTile label='Requested on' value='25th Sept' />
                <TakeSpace space={5} />
                <BorderBottom />
                <HeaderTile label='Payment Details' />
                <TextTile label='Service Name' value='General Medicine Bookings' switchStyle />
                <TextTile label='Payment Date' value='25th Sept 2024 | 8:00 am' switchStyle />
                <TextTile label='Timeslot' value='8 am to 11:00 pm' switchStyle />
                <TextTile label='Timeslot' value='8 am to 11:00 pm' switchStyle />
                <TakeSpace />
                <View style={styles.footCont}>
                    <View style={[styles.savingCont, styles.commonStyle]}>
                        <PartySvg />
                        <Text style={styles.saveTxt}>Great ! You saved EGP 50 !</Text>
                    </View>
                    <View style={[styles.amountCont, styles.commonStyle]}>
                        <Text style={styles.amountTxt}>Original amount : EGP 230</Text>
                    </View>
                    <View style={[styles.paidAmtCont, styles.commonStyle]}>
                        <Text style={styles.paidTxt}>Paid amount : EGP 230</Text>
                    </View>
                </View>
            </View>
        );
    };

    return <SafeAreaInsect
        data={[1]}
        renderItem={renderBookingDetails}
        ListHeaderComponent={<Header title='Booking Details' />}
    />

};

export default MerchBookingDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(16),
    },
    headerTxt: { ...fontStyles.notoSansSemiBold12, paddingVertical: moderateScale(10) },
    saveTxt: { ...fontStyles.notoSansMedium12, color: Colors.yellow, },
    amountTxt: { ...fontStyles.notoSansMedium12, color: Colors.success, },
    paidTxt: { ...fontStyles.notoSansMedium12, color: Colors.info, },
    commonStyle: {
        ...commonStyles.flexRow,
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(4),
        borderRadius: moderateScale(10),
    },
    savingCont: { backgroundColor: Colors.fadedYellow },
    amountCont: { backgroundColor: Colors.fadedSuccess },
    paidAmtCont: { backgroundColor: Colors.fadedInfo },
    footCont: { rowGap: moderateScale(10), alignSelf: 'flex-start' }
});
