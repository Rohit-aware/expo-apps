import React from 'react';
import { Image } from 'expo-image';
import { TransactionItem } from '../use-payment';
import { commonStyles } from '../../../../styles';
import fontStyles from '../../../../styles/font-styles';
import { Colors, moderateScale } from '../../../../constants';
import { StyleSheet, TextStyle, View, Text, ViewStyle, Pressable } from 'react-native';

type TextProps = { style: TextStyle, label: string }
type PaymentCardProps = { item: TransactionItem, index: number; onPress: () => void }

const Wrapper = React.memo<React.PropsWithChildren>(({ children }) => (
    <View style={styles.wrapperCont}>{children}</View >
));

const TextWrapper = React.memo<TextProps>(({ style, label }) => (
    <Text style={[style, { width: '75%', flexWrap: 'wrap' }]} numberOfLines={1} ellipsizeMode='tail'>
        {label}
    </Text>
));

const PaymentsCard: React.FC<PaymentCardProps> = ({ item, index, onPress }) => {
    const { amount, date, image, productName, restaurantName, status } = item;

    const getStatus = React.useCallback((): TextStyle | undefined => {
        switch (status) {
            case 'Failed':
                return {
                    color: Colors['error'],
                    backgroundColor: Colors['fadedError'],
                }
            case 'Pending':
                return {
                    color: Colors['warnign'],
                    backgroundColor: Colors['fadedWarnign'],
                }
            case 'Success':
                return {
                    color: Colors['success'],
                    backgroundColor: Colors['fadedSuccess'],
                }
            default:
                break;
        };
    }, [status]);
    const getOpacity = React.useCallback((): ViewStyle => {
        return { opacity: status === 'Failed' ? 0.5 : 1 };
    }, [status]);

    return (
        <Pressable style={[styles.container, getOpacity()]} onPress={onPress}>
            <View style={{ flex: 0.2 }}>
                <Image
                    source={image}
                    style={styles.Img}
                />
            </View>
            <View style={{ flex: 0.8 }}>
                <Wrapper>
                    <TextWrapper label={productName} style={styles.productName} />
                    <Text style={styles.productName}>{amount}</Text>
                </Wrapper>
                <TextWrapper label={restaurantName} style={styles.restuarantName} />
                <Wrapper>
                    <Text style={styles.dateTxt}>{date}</Text>
                    <Text style={[styles.paymentType, getStatus()]}>{status}</Text>
                </Wrapper>
            </View>
        </Pressable>
    )
}

export default React.memo(PaymentsCard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...commonStyles.RowJFSAC,
        borderBottomColor: Colors.black05,
        paddingVertical: moderateScale(10),
        borderBottomWidth: moderateScale(1),
    },
    Img: { width: moderateScale(55), height: moderateScale(55), borderRadius: moderateScale(16) },
    wrapperCont: { ...commonStyles.RowJSBAC, paddingVertical: moderateScale(2) },
    productName: { ...fontStyles.notoSansSemiBold14 },
    paymentType: {
        borderRadius: moderateScale(16),
        ...fontStyles.notoSansSemiBold10,
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(8),
    },
    restuarantName: { ...fontStyles.notoSansRegular12 },
    dateTxt: { ...fontStyles.notoSansSemiBold10, color: Colors.black50 },
});