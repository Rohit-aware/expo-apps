import React from 'react';
import { Image } from 'expo-image';
import { commonStyles } from '../../../../styles';
import { TakeSpace } from '../../../../components';
import { RecentTransactionItem } from '../interface';
import fontStyles from '../../../../styles/font-styles';
import { Colors, Images, moderateScale } from '../../../../constants';
import { FlatList, ListRenderItem, StyleSheet, Text, TextStyle, View } from 'react-native';

type TextProps = { style: TextStyle, label: string }
type RecentTransactionProps = {
    data: Array<any>;
    ListFooterComponent: | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined
}

const Size16 = moderateScale(16);
const Space10 = () => <TakeSpace space={10} />;

const Wrapper = React.memo<React.PropsWithChildren>(({ children }) => (
    <View style={styles.wrapperCont}>{children}</View >
));

const TextWrapper = React.memo<TextProps>(({ style, label }) => (
    <Text style={[style, { width: '75%', flexWrap: 'wrap' }]} numberOfLines={1} ellipsizeMode='tail'>
        {label}
    </Text>
));


const renderList: ListRenderItem<RecentTransactionItem> =
    ({ item }) => {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.2 }}>
                    <Image
                        style={styles.Img}
                        source={Images.transaction_image}
                    />
                </View>
                <View style={{ flex: 0.8 }}>
                    <Wrapper>
                        <TextWrapper label={item.productName} style={styles.productName} />
                        <Text style={styles.paymentMode}>{item.paymentMode}</Text>
                    </Wrapper>
                    <Wrapper>
                        <TextWrapper label={item.restaurantName} style={styles.restuarantName} />
                        <Text style={styles.priceTxt}>{item.price}</Text>
                    </Wrapper>
                    <Wrapper>
                        <Text style={styles.dateTxt}>{item.date}</Text>
                        <Text style={styles.paymentType}>{item.paymentType}</Text>
                    </Wrapper>
                </View>
            </View>
        )
    };


const RecentTransaction: React.FC<RecentTransactionProps> =
    ({ data, ListFooterComponent }) => {
        return (
            <FlatList
                data={data}
                renderItem={renderList}
                ItemSeparatorComponent={Space10}
                style={{ paddingVertical: Size16 }}
                ListFooterComponent={ListFooterComponent}
            />

        );
    };

export default RecentTransaction;
const styles = StyleSheet.create({
    container: {
        ...commonStyles.RowJFSAC, flex: 1,
        borderRadius: moderateScale(16),
    },
    Img: {
        width: moderateScale(54),
        height: moderateScale(54),
    },
    priceTxt: { ...fontStyles.notoSansBold16 },
    paymentMode: { ...fontStyles.notoSansMedium12 },
    productName: { ...fontStyles.notoSansSemiBold14 },
    restuarantName: { ...fontStyles.notoSansRegular12 },
    dateTxt: { ...fontStyles.notoSansSemiBold10, color: Colors.black50 },
    paymentType: { ...fontStyles.notoSansSemiBold10, color: Colors.black50 },
    wrapperCont: { ...commonStyles.RowJSBAC, paddingVertical: moderateScale(2) },
});