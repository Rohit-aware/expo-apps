import React from 'react';
import { commonStyles } from '../../../styles';
import fontStyles from '../../../styles/font-styles';
import { Colors, moderateScale } from '../../../constants';
import { StyleSheet, TextStyle, View, Text, ViewStyle, Pressable } from 'react-native';

type TextProps = { style: TextStyle | TextStyle[], label: string }
type PaymentCardProps = { item: any, index: number; onPress: () => void }

const TextWrapper: React.FC<TextProps> = ({ style, label }) => (
    <Text style={[{ width: '75%', flexWrap: 'wrap' }, style]} numberOfLines={1} ellipsizeMode='tail'>
        {label}
    </Text>
);

const MerchatPaymentsCard: React.FC<PaymentCardProps> = ({ item, index, onPress }) => {
    const { amount, date, image, productName, restaurantName, status } = item || {};

    const opacityStyle = React.useMemo((): ViewStyle => ({
        opacity: status === 'Cancelled' ? 0.5 : 1
    }), [status]);

    return (
        <Pressable style={[styles.container, opacityStyle]} onPress={onPress}>
            <View style={{ flex: 0.2 }}>
                <View style={styles.initNameCont}>
                    <Text style={fontStyles.notoSansBold18}>D</Text>
                </View>
            </View>
            <View style={{ flex: 0.8 }}>
                <View style={styles.wrapperCont}>
                    <TextWrapper label={'Dave Jones'} style={[styles.customerName, { width: '75%' }]} />
                    <TextWrapper label={'EGP 250'} style={[styles.EGPTxt, { width: '25%', textAlign: 'center' }]} />
                </View>
                <View style={styles.wrapperCont}>
                    <TextWrapper label={'General Medicine Bookings'} style={[styles.reasonTxt, { width: '75%' }]} />
                    <TextWrapper label={'EGP 230'} style={[styles.discEGP, { width: '25%', textAlign: 'center' }]} />
                </View>
                <TextWrapper label={'25th Sept, 8:00'} style={styles.dateTxt} />
            </View>
        </Pressable>
    );
}

export default React.memo(MerchatPaymentsCard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...commonStyles.flexRow,
        borderBottomColor: Colors.black05,
        paddingVertical: moderateScale(10),
        borderBottomWidth: moderateScale(1),
    },
    wrapperCont: { ...commonStyles.RowJSBAC, paddingVertical: moderateScale(2) },
    customerName: { ...fontStyles.notoSansSemiBold14 },
    EGPTxt: { ...fontStyles.notoSansBold14 },
    reasonTxt: { ...fontStyles.notoSansRegular12, opacity: 0.75 },
    discEGP: {
        borderRadius: moderateScale(16),
        ...fontStyles.notoSansSemiBold10,
        color: Colors.info,
        backgroundColor: Colors.fadedInfo,
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(8),
    },
    dateTxt: { ...fontStyles.notoSansSemiBold10, color: Colors.black50 },
    initNameCont: {
        width: moderateScale(45),
        height: moderateScale(45),
        ...commonStyles.centerJCAC,
        backgroundColor: Colors.error20,
        borderRadius: moderateScale(22.5),
    },
});