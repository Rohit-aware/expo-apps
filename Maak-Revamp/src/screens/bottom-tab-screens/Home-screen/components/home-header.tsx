import React from 'react';
import { commonStyles } from '../../../../styles';
import { navigationHook } from '../../../../hooks';
import { LinearGradient } from 'expo-linear-gradient';
import fontStyles from '../../../../styles/font-styles';
import { Colors, moderateScale } from '../../../../constants';
import { InputField, TakeSpace } from '../../../../components';
import { Animated, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { BellIcon, DiamondSvg, MenuSvg, SearchIcon } from '../../../../assets/icons';

const Wrapper: React.FC<React.PropsWithChildren<{ conatiner?: ViewStyle }>> = React.memo(
    ({ children, conatiner }) => {
        return (
            <View style={[commonStyles.RowJFSAC, conatiner, { columnGap: moderateScale(10) }]}>
                {children}
            </View>
        );
    });


const HomeHeader = React.memo(() => {
    const { navigateTo } = navigationHook();
    const toSearch = React.useCallback(() => navigateTo('GlobaSearch'), [])
    return (
        <Animated.View style={[]}>
            <LinearGradient colors={['#D30B0B', '#DD4747',]} style={[styles.container]} >
                <TakeSpace space={16} />
                <View style={[styles.welContainer]}>
                    <Wrapper >
                        <View style={styles.nameCont}>
                            <Text style={fontStyles.notoSansSemiBold20}>R</Text>
                            <MenuSvg style={{ position: 'absolute', bottom: 0, left: -10 }} />
                        </View>
                        <View style={commonStyles.columnJFS}>
                            <Text style={[fontStyles.notoSansRegular16, { color: Colors.textWhite }]}>Welcome</Text>
                            <Text style={[fontStyles.notoSansSemiBold16, { color: Colors.textWhite }]}>Ritesh</Text>
                        </View>
                    </Wrapper>
                    <Wrapper >
                        <BellIcon />
                        <DiamondSvg />
                    </Wrapper>
                </View>
                <InputField
                    value={''}
                    editable={false}
                    Icon={SearchIcon}
                    onPress={toSearch}
                    onChangeText={() => { }}
                    placeholder='Search here'
                    cursorColor={Colors.white}
                    rootStyle={{ width: '90%' }}
                    placeholderTextColor={Colors.white}
                    textContinerStyle={styles.searchCont}
                />
                <TakeSpace space={8} />
            </LinearGradient>
        </Animated.View >
    );
});

export default HomeHeader;

const styles = StyleSheet.create({
    nameCont: {
        borderRadius: '50%',
        position: 'relative',
        width: moderateScale(63),
        height: moderateScale(63),
        ...commonStyles.centerJCAC,
        backgroundColor: Colors.white,
    },
    container: {
        borderBottomLeftRadius: moderateScale(25),
        borderBottomRightRadius: moderateScale(25),
    },
    searchCont: {
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(60),
        backgroundColor: Colors.white10,
        borderColor: Colors.ligthWhiteBorder,
    },
    // paymentTypCont: {
    //     width: '25%',
    //     rowGap: moderateScale(6),
    //     ...commonStyles.columnJFSAC,
    // },
    // paymentTxt: {
    //     ...fontStyles.notoSansSemiBold12,
    //     color: Colors.textWhite,
    //     textAlign: 'center'
    // },
    welContainer: {
        ...commonStyles.RowJSBAC, padding: moderateScale(16)
    },
    // bottomCont: {
    //     zIndex: -1,
    //     alignItems: 'center',
    //     top: moderateScale(-20),
    //     justifyContent: 'flex-end',
    //     paddingTop: moderateScale(30),
    //     paddingBottom: moderateScale(10),
    //     backgroundColor: Colors.fadedYellow,
    //     borderBottomLeftRadius: moderateScale(22),
    //     borderBottomRightRadius: moderateScale(22),
    // }
})