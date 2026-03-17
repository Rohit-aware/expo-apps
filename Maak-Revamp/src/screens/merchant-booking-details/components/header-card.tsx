import React from 'react';
import { commonStyles } from '../../../styles';
import { Image } from 'expo-image';
import { TakeSpace } from '../../../components';
import fontStyles from '../../../styles/font-styles';
import { YellowStar, MessageIcon } from '../../../assets/icons';
import { Colors, Images, moderateScale } from '../../../constants';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type TextProps = { style: TextStyle, label: string };
type IconTileProps = { icon: React.ReactElement, value: string; styles: ViewStyle };

const TextWrapper = ({ style, label }: TextProps) => (
    <Text style={[style, { width: '100%' }]} numberOfLines={1} ellipsizeMode='tail'>
        {label}
    </Text>
);

const IconTile = ({ icon, value, styles }: IconTileProps) => (
    <View style={[commonStyles.RowJFSAC, styles]}>
        <Text style={fontStyles.notoSansRegular10}>{value}</Text>
        <TakeSpace space={2} />
        {icon}
    </View>
);

const HeaderCard = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.Img}
                source={Images.good_food}
            />
            <View style={styles.secCont}>
                <Text style={styles.idCont}>#2208202461</Text>
                <TextWrapper style={styles.serviceName} label='MAAK 1st Event' />
                <TextWrapper style={styles.reasonTxt} label='General Medicine Bookings' />
                <View style={commonStyles.RowJFSAC}>
                    <IconTile icon={<YellowStar />} value={'4'} styles={styles.ratingCont} />
                    <TakeSpace space={4} />
                    <IconTile icon={<MessageIcon />} value={'30'} styles={styles.messgCont} />
                </View>
            </View>
        </View >
    );
}

export default HeaderCard;

const styles = StyleSheet.create({
    container: {
        ...commonStyles.RowJFSAC,
        columnGap: moderateScale(10),
    },
    idCont: {
        ...fontStyles.notoSansMedium10,
        backgroundColor: Colors.black05,
        borderRadius: moderateScale(6),
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(6),
        alignSelf: 'flex-start',
        textAlign: 'left',
    },
    Img: {
        width: moderateScale(65),
        height: moderateScale(65),
        borderRadius: moderateScale(32.5),
    },
    secCont: {
        rowGap: moderateScale(6),
        flex: 1,
    },
    serviceName: { ...fontStyles.notoSansSemiBold14 },
    reasonTxt: { ...fontStyles.notoSansRegular12 },
    ratingCont: {
        backgroundColor: Colors.fadedYellow,
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(2),
        borderRadius: moderateScale(6),
    },
    messgCont: {
        backgroundColor: Colors.black05,
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(2),
        borderRadius: moderateScale(6),
    }
});