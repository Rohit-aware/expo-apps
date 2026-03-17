import React from 'react';
import { Image } from 'expo-image';
import { commonStyles } from '../../../../styles';
import { TakeSpace } from '../../../../components';
import { Images, moderateScale } from '../../../../constants';
import { SCREEN_WIDTH } from '../../../../constants/responsive';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';

type OfferBannersProps = {
    data: Array<any>;
}

const Size16 = moderateScale(16);
const Space6 = () => <TakeSpace space={6} />;

const renderItem: ListRenderItem<string> = ({ index, item }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.Img}
                source={Images.seconday_banner}
            />
        </View>
    );
};

const OfferBanners = ({ data }: OfferBannersProps) => {
    return (
        <FlatList
            horizontal
            renderItem={renderItem}
            data={data}
            style={{ paddingBlock: Size16 }}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={Space6}
            ListFooterComponent={Space6}
        />
    )
}

export default OfferBanners;

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.45,
        ...commonStyles.centerJCAC,
        ...commonStyles.commonShadow,
        borderRadius: moderateScale(16),
        marginHorizontal: moderateScale(8),
    },
    Img: {
        width: SCREEN_WIDTH * 0.45,
        height: moderateScale(175),
        borderRadius: moderateScale(16),
    },
});