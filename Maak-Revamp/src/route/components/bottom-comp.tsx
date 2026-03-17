import React from 'react';
import { Colors } from '../../constants';
import { commonStyles } from '../../styles';
import fontStyles from '../../styles/font-styles';
import moderateScale from '../../constants/responsive';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { FlatList, Keyboard, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HomeSvg, OffersSvg, ScanQRSvg, PaymentSvg, ProfileSvg, BottomBackSvg } from '../../assets/icons';

type LabelIconProps = { index: number, isFocused: boolean };


const RenderIcon = React.memo(({ index, isFocused }: LabelIconProps) => {
    switch (index) {
        case 0: return <HomeSvg active={isFocused} />;
        case 1: return <OffersSvg active={isFocused} />;
        case 2: return <ScanQRSvg active={isFocused} />;
        case 3: return <PaymentSvg active={isFocused} />;
        case 4: return <ProfileSvg active={isFocused} />;
        default: return null;
    }
});

const RenderTabLabel = React.memo(({ index, isFocused }: LabelIconProps) => {
    const labels = ["Home", "Offer", 'Scan', "Payment", "Profile"];
    return (
        <Text style={[fontStyles.notoSansBold12, {
            textAlign: 'center',
            color: isFocused ? (index == 2 ? Colors.primaryColor : Colors.secColor) : Colors.black25
        }]}>
            {labels[index]}
        </Text >
    );
});
const BottomComp = (props: BottomTabBarProps) => {
    const { state, navigation } = props;
    const [showBottomTab, setShowBottomTab] = React.useState(true);

    const showtab = () => setShowBottomTab(true);
    const hidetab = () => setShowBottomTab(false);

    const handleTabPress = React.useCallback((index: number, isFocused?: boolean) => {
        if (isFocused) return;
        navigation.navigate(state.routeNames[index]);
    }, []);

    const renderLabels: ListRenderItem<string> =
        React.useCallback(({ item, index }) => {
            const isFocused = index === state.index;
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleTabPress(index, isFocused)}
                    style={[styles.tab]}
                >
                    {(isFocused && index !== 2) && <View style={styles.tabActive} />}
                    <RenderIcon index={index} isFocused={isFocused} />
                    <RenderTabLabel index={index} isFocused={isFocused} />
                </TouchableOpacity>
            )
        }, [state.index])

    React.useEffect(() => {
        const keyDidShow = Keyboard.addListener('keyboardDidShow', hidetab);
        const keyDidHide = Keyboard.addListener('keyboardDidHide', showtab);
        return () => { keyDidHide.remove(); keyDidShow.remove(); };
    }, [showBottomTab]);

    return showBottomTab && (
        <View style={[styles.container]}>
            <BottomBackSvg style={styles.BackIconSvg} />
            <View style={styles.tabWrapper}>
                <FlatList
                    style={{ flex: 1 }}
                    data={state.routeNames}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.tabContainer}
                    renderItem={renderLabels}
                    keyExtractor={(_, index) => String(index)}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: moderateScale(80),
        backgroundColor: Colors.white,
    },
    tabWrapper: {
        flex: 1,
        zIndex: 1,
        justifyContent: 'space-between'
    },
    tabContainer: {
        ...commonStyles.RowJSBAC,
        paddingHorizontal: moderateScale(8)
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        rowGap: moderateScale(2),
        justifyContent: 'flex-end',
        paddingLeft: moderateScale(10)
    },
    tabActive: {
        top: 1,
        zIndex: 1,
        width: '70%',
        position: 'absolute',
        height: moderateScale(2),
        borderRadius: moderateScale(10),
        backgroundColor: Colors.secColor,
    },
    BackIconSvg: { position: 'absolute', zIndex: 1, bottom: moderateScale(12), left: moderateScale(-8) }
});
export default BottomComp;