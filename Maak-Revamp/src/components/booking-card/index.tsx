import React from 'react';
import { commonStyles } from '../../styles';
import TakeSpace from '../common/take-space';
import fontStyles from '@/src/styles/font-styles';
import { Colors, moderateScale } from '../../constants';
import { Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';

type TextProps = { style: TextStyle | TextStyle[], label: string }
const TextWrapper = React.memo<TextProps>(({ style, label }) => (
    <Text style={[{ width: '95%', height: moderateScale(16) }, style]} numberOfLines={1} ellipsizeMode='tail'>
        {label}
    </Text>
));

const BookingCard: React.FC<{ item: any, index: number, onPress?: () => void }> =
    ({ index, item, onPress }) => {
        return (
            <Pressable onPress={onPress}>
                <TakeSpace space={6} />
                <View style={styles.container}>
                    <View style={{ flex: 0.14, alignItems: 'center' }}>
                        <View style={styles.initNameCont}>
                            <Text style={fontStyles.notoSansBold18}>D</Text>
                        </View>
                    </View>
                    <View style={styles.middleCont}>
                        <View style={styles.rowJSB}>
                            <Text style={styles.idTxt}>#2208202461</Text>
                            <Text style={styles.statusTxt}>Cancelled</Text>
                        </View>
                        <TextWrapper label='Dave Jones' style={styles.nameTxt} />
                        <TextWrapper label='General Medicine Bookings' style={styles.reasonTxt} />
                        <View style={styles.rowJSB}>
                            <TextWrapper label='8:00 pm - 11:00 pm' style={[styles.slotTxt, { width: '75%' }]} />
                            <TextWrapper label='25th sept djklbahb' style={[styles.slotTxt, { width: '25%', textAlign: 'right' }]} />
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }

export default BookingCard;

const styles = StyleSheet.create({
    container: {
        ...commonStyles.flexRow,
        columnGap: moderateScale(10),
        marginVertical: moderateScale(10),
    },
    middleCont: {
        flex: 0.85,
        rowGap: moderateScale(6),
    },
    initNameCont: {
        width: moderateScale(45),
        height: moderateScale(45),
        ...commonStyles.centerJCAC,
        backgroundColor: Colors.error20,
        borderRadius: moderateScale(22.5),
    },
    rowJSB: { ...commonStyles.RowJSB },
    nameTxt: { ...fontStyles.notoSansSemiBold14 },
    reasonTxt: { ...fontStyles.notoSansRegular12 },
    slotTxt: { ...fontStyles.notoSansMedium10, opacity: 0.5 },
    idTxt: {
        ...fontStyles.notoSansMedium10,
        backgroundColor: Colors.black05,
        borderRadius: moderateScale(6),
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(6),
    },
    statusTxt: {
        borderRadius: moderateScale(6),
        ...fontStyles.notoSansSemiBold10,
        color: Colors.error,
        paddingVertical: moderateScale(4),
        backgroundColor: Colors.fadedError,
        paddingHorizontal: moderateScale(6),
    },
})