import React from 'react';
import { Image } from 'expo-image';
import { commonStyles } from '../../../styles';
import { Colors, Images } from '../../../constants';
import fontStyles from '../../../styles/font-styles';
import moderateScale, { SCREEN_WIDTH } from '../../../constants/responsive';
import { ListRenderItem, StyleSheet, Text, TextStyle, View } from 'react-native';

type TextProps = { style: TextStyle, label: string }

interface RecentTransactionItem {
    productName: string;
    paymentMode: string;
    restaurantName: string;
    price: string;
    date: string;
    paymentType: string;
};

const TextWrapper = React.memo<TextProps>(({ style, label }) => (
    <Text style={[style, { width: '95%' }]} numberOfLines={1} ellipsizeMode='tail'>
        {label}
    </Text>
));

const SerivceCard: ListRenderItem<RecentTransactionItem> = ({ item, index }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.Img}
                source={Images.card_Image}
            />
            <View style={styles.bottomCont}>
                <View style={{ flex: 0.22 }}>
                    <Image
                        style={styles.transactionImg}
                        source={Images.transaction_image}
                    />
                </View>
                <View style={{ flex: 0.77 }}>
                    <TextWrapper label={item.productName} style={styles.productName} />
                    <TextWrapper label={item.restaurantName} style={styles.restuarantName} />
                </View>
            </View>
        </View >
    )
}

export default SerivceCard;

const styles = StyleSheet.create({
    container: {
        rowGap: moderateScale(6),
        width: SCREEN_WIDTH * 0.8,
        ...commonStyles.columnJFSAC,
        ...commonStyles.commonShadow,
        backgroundColor: Colors.white,
        borderRadius: moderateScale(16),
        marginHorizontal: moderateScale(6),
    },

    bottomCont: {
        ...commonStyles.RowJFSAC,
        paddingHorizontal: moderateScale(10),
        paddingBottom: moderateScale(6)
    },
    Img: {
        width: SCREEN_WIDTH * 0.8,
        height: moderateScale(125),
        borderTopLeftRadius: moderateScale(16),
        borderTopRightRadius: moderateScale(16),
    },
    transactionImg: {
        width: moderateScale(54),
        height: moderateScale(54),
        borderRadius: moderateScale(16),
    },
    priceTxt: { ...fontStyles.notoSansBold16 },
    paymentMode: { ...fontStyles.notoSansMedium12 },
    productName: { ...fontStyles.notoSansMedium12 },
    restuarantName: { ...fontStyles.notoSansRegular10 },
});