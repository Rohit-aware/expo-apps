import React from 'react';
import { commonStyles } from '../../../../styles';
import { moderateScale } from '../../../../constants';
import fontStyles from '../../../../styles/font-styles';
import { RestaurantSvg } from '../../../../assets/icons';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text } from 'react-native';

type ServicesSectionProps = {
    data: Array<any>;
    ListFooterComponent: | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined
};

const Size10 = moderateScale(10);
const Size16 = moderateScale(16);



const ServicesSection = ({ data, ListFooterComponent }: ServicesSectionProps) => {

    const renderServiceTile = React.useCallback<ListRenderItem<{}>>(({ index }) => (
        <Pressable style={styles.paymentTypCont} onPress={() => { }}>
            <RestaurantSvg />
            <Text style={styles.paymentTxt}>Restaurant</Text>
        </Pressable>
    ), []);
    
    return (
        <FlatList
            data={data}
            numColumns={4}
            renderItem={renderServiceTile}
            style={{ paddingVertical: Size16 }}
            columnWrapperStyle={{ paddingBlock: Size10 }}
            ListFooterComponent={ListFooterComponent}
        />
    )
}

export default ServicesSection

const styles = StyleSheet.create({
    paymentTypCont: {
        width: '25%',
        rowGap: moderateScale(6),
        ...commonStyles.columnJFSAC,
    },
    paymentTxt: {
        ...fontStyles.notoSansMedium12,
        textAlign: 'center',
    },
})