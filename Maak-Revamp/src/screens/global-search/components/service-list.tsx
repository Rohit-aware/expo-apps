import React from 'react';
import { commonStyles } from '../../../styles';
import { Image } from 'expo-image';
import { TakeSpace } from '../../../components';
import { YellowStar } from '../../../assets/icons';
import fontStyles from '../../../styles/font-styles';
import { SCREEN_WIDTH } from '../../../constants/responsive';
import { Colors, Images, moderateScale } from '../../../constants';
import { FlatList, I18nManager, ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';

const Space8 = () => <TakeSpace space={6} />;

const ServiceList = React.memo(() => {

    const renderServiceList = React.useCallback<ListRenderItem<{}>>(() => {
        return (
            <Pressable style={styles.cardCont}>
                <View style={styles.imageCont}>
                    <Image
                        source={Images.service_list}
                        style={styles.Img}
                    />
                    <View style={styles.branchCont}>
                        <Text style={styles.branchTxt}>1000 branches</Text>
                    </View>
                </View>
                <Text style={styles.companyName} numberOfLines={2} ellipsizeMode='tail'>Company ABC</Text>
                <View style={styles.ratingCont}>
                    <Text style={styles.ratingTxt}>4</Text>
                    <YellowStar />
                </View>
            </Pressable>
        );
    }, []);

    return (
        <FlatList
            horizontal
            data={[1, 2, 3, 4]}
            style={styles.container}
            ListHeaderComponent={Space8}
            ListFooterComponent={Space8}
            renderItem={renderServiceList}
            ItemSeparatorComponent={Space8}
            showsHorizontalScrollIndicator={false}
            inverted={I18nManager.isRTL ? true : false}
        />
    )
});

export default ServiceList;

const styles = StyleSheet.create({
    container: { paddingVertical: moderateScale(16) },
    cardCont: {
        rowGap: moderateScale(10),
        ...commonStyles.columnJCAC,
        width: SCREEN_WIDTH * 0.37,
        ...commonStyles.commonShadow,
        paddingTop: moderateScale(4),
        backgroundColor: Colors.white,
        borderRadius: moderateScale(16),
        paddingVertical: moderateScale(8),
    },
    Img: {
        width: moderateScale(125),
        height: moderateScale(115),
        borderRadius: moderateScale(12),
    },
    ratingTxt: { ...fontStyles.notoSansRegular10, paddingLeft: 4 },
    companyName: { ...fontStyles.notoSansMedium12, flexShrink: 1, textAlign: 'center' },
    ratingCont: {
        ...commonStyles.RowJFSAC,
        columnGap: moderateScale(4),
        borderRadius: moderateScale(6),
        backgroundColor: Colors.secod10,
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(8),
    },
    imageCont: { position: 'relative' },
    branchCont: {
        position: 'absolute',
        right: moderateScale(0),
        bottom: moderateScale(-4),
        ...commonStyles.commonShadow,
        backgroundColor: Colors.textWhite,
        paddingVertical: moderateScale(2),
        paddingHorizontal: moderateScale(8),
        borderTopLeftRadius: moderateScale(6),
        borderBottomLeftRadius: moderateScale(6),
        borderBottomRightRadius: moderateScale(6),
        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
    },
    branchTxt: { ...fontStyles.notoSansRegular10, color: Colors.success },
})