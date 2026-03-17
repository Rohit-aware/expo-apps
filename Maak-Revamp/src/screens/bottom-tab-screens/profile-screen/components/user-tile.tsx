import React from 'react';
import { Image } from 'expo-image';
import { commonStyles } from '../../../../styles';
import { BorderBottom } from '../../../../components';
import { Colors, Images } from '../../../../constants';
import fontStyles from '../../../../styles/font-styles';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import moderateScale, { SCREEN_WIDTH } from '../../../../constants/responsive';
import { ColoredScanner, ProfileCardIcon, ColoredProfile } from '../../../../assets/icons';
import { navigationHook } from '../../../../hooks';

type IconTIleProps = {
    icon: React.ReactElement;
    label: string;
    onPress?: () => void;
}


const IconTIle: React.FC<IconTIleProps> = React.memo(
    ({ icon, label, onPress }) => {
        return (
            <Pressable style={styles.iconCont} onPress={onPress}>
                {icon}
                <Text style={fontStyles.notoSansSemiBold10}>{label}</Text>
            </Pressable>
        );
    });

const UserTile = () => {
    const { navigateTo } = navigationHook();
    const navigateToEditprofile = React.useCallback(() => {
        navigateTo('Editprofile')
    }, [])
    return (
        <Pressable onPress={navigateToEditprofile}>
            <Image
                style={styles.img}
                source={Images.profile_back}
            />
            <View style={styles.whiteBorder}>
                <View style={styles.whiteCont}>
                    <Text style={fontStyles.notoSansBold20}>R</Text>
                </View>
            </View>
            <View style={styles.nameCont}>
                <Text style={fontStyles.notoSansBold18}>Rohit Sharma</Text>
                <Text style={styles.memberTxt}>Gold Member</Text>
            </View>
            <BorderBottom rootStyles={styles.border} />
            <View style={styles.iconTileParent}>
                <IconTIle icon={<ColoredScanner />} label='QR Code' />
                <IconTIle icon={<ProfileCardIcon />} label='My Card' />
                <IconTIle icon={<ColoredProfile />} label='Profile' />
            </View>
        </Pressable>
    );
};

export default UserTile;

const styles = StyleSheet.create({
    img: {
        width: SCREEN_WIDTH,
        height: moderateScale(190),
    },
    whiteBorder: {
        alignSelf: 'center',
        borderRadius: '50%',
        width: moderateScale(124),
        height: moderateScale(124),
        borderColor: Colors.white,
        ...commonStyles.centerJCAC,
        marginTop: moderateScale(-65),
        borderWidth: moderateScale(1.11),
    },
    whiteCont: {
        borderRadius: '50%',
        width: moderateScale(78),
        height: moderateScale(78),
        ...commonStyles.centerJCAC,
        backgroundColor: Colors.shadedWhite
    },
    memberTxt: {
        ...fontStyles.notoSansMedium10,
        color: Colors.yellow,
        borderRadius: moderateScale(10),
        paddingVertical: moderateScale(8),
        backgroundColor: Colors.fadedWarnign,
        paddingHorizontal: moderateScale(10),
    },
    border: {
        width: '95%',
        alignSelf: 'center',
        paddingVertical: moderateScale(10),
    },
    nameCont: {
        rowGap: moderateScale(6),
        ...commonStyles.centerJCAC,
    },
    iconCont: {
        width: '30%',
        ...commonStyles.RowJCAC,
        padding: moderateScale(10),
        columnGap: moderateScale(10),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.black05,
    },
    iconTileParent: {
        ...commonStyles.RowJSBAC,
        padding: moderateScale(16),
    }
});