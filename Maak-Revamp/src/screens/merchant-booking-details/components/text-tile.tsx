import React from 'react';
import { commonStyles } from '../../../styles';
import { moderateScale } from '../../../constants';
import fontStyles from '../../../styles/font-styles';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { TakeSpace } from '../../../components';

interface TextTileProps {
    label: string;
    value: string;
    switchStyle?: boolean;
};

const TextTile: React.FC<TextTileProps> = React.memo(
    ({ label, value, switchStyle }) => {

        const textStyle = React.useMemo<TextStyle>(() => {
            if (switchStyle) {
                return { ...fontStyles.notoSansSemiBold12, opacity: 0.75 };
            } else {
                return styles.valueTxt;
            }
        }, [switchStyle])
        return (
            <>
                <TakeSpace space={4} />
                <View style={styles.container}>
                    <Text style={[textStyle, { flex: 0.3 }]}>{label}</Text>
                    <Text style={[textStyle, { flex: 0.01 }]}>:</Text>
                    <Text style={styles.valueTxt}>{value}</Text>
                </View>
            </>
        );
    });

export default TextTile;

const styles = StyleSheet.create({
    container: {
        ...commonStyles.RowJSB,
        columnGap: moderateScale(10),
    },
    valueTxt: { ...fontStyles.notoSansRegular12, opacity: 0.75, flex: 0.7 }
});