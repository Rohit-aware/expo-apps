import React from 'react';
import { commonStyles } from '../../../styles';
import { TakeSpace } from '../../../components';
import { Colors, Images } from '../../../constants';
import fontStyles from '../../../styles/font-styles';
import { AppNameLogo, GlobeSvg } from '../../../assets/icons';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import moderateScale, { SCREEN_WIDTH } from '../../../constants/responsive';

const AuthHeader = React.memo(({ title, subTitle }: { title: string, subTitle: string }) => {
    return (
        <>
            <ImageBackground
                source={Images.LoignEllips}
                style={styles.Img}
            >
                <TakeSpace space={50} />
                <View style={commonStyles.RowJSBAC}>
                    <AppNameLogo />
                    <View style={[commonStyles.RowJFSAC, { columnGap: 6 }]}>
                        <GlobeSvg />
                        <Text style={styles.text}>English</Text>
                    </View>
                </View>
                <TakeSpace space={26} />
                <Text style={styles.titleText}>{title}</Text>
                <TakeSpace space={6} />
                <Text style={[styles.text, { color: Colors.textWhite75 }]}>{subTitle}</Text>
            </ImageBackground>
        </>
    )
});

export default AuthHeader;

const styles = StyleSheet.create({
    Img: {
        width: SCREEN_WIDTH,
        aspectRatio: 1.2,
        paddingHorizontal: moderateScale(16),
        bottom: moderateScale(26)
    },
    text: {
        ...fontStyles.notoSansRegular14,
        color: Colors.textWhite
    },
    titleText: {
        ...fontStyles._notoSansExtraBold('NotoSans-Bold', 20, Colors.textWhite),
        color: Colors.textWhite,
    },
})