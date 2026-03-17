import React from 'react';
import { commonStyles } from '../../../styles';
import fontStyles from '../../../styles/font-styles';
import { Colors, moderateScale } from '../../../constants';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
import { TakeSpace } from '../../../components';

interface BottomTileProps {
    onPress: () => void;
    firstLabel: string;
    secondLabel: string;
    smallTxt?: boolean;
}

const BottomTile = React.memo((props: BottomTileProps) => {
    const { onPress, smallTxt, firstLabel, secondLabel } = props;

    const labelFontSize = moderateScale(smallTxt ? 12 : 14);

    const firstLabelStyle = React.useMemo<TextStyle>(() => ({
        ...fontStyles.notoSansRegular14,
        fontSize: labelFontSize,
    }), [smallTxt]);

    const secondLabelStyle = React.useMemo<TextStyle>(() => ({
        ...fontStyles.notoSansRegular14,
        fontSize: labelFontSize,
        color: Colors.secColor,
    }), [smallTxt]);

    return (
        <View style={styles.container}>
            <Text style={firstLabelStyle}>{firstLabel}</Text>
            <Text style={secondLabelStyle} onPress={onPress}>
                {' '}{secondLabel}
            </Text>
            <TakeSpace space={10} />
        </View>
    );
});

export default BottomTile;

const styles = StyleSheet.create({
    container: {
        ...commonStyles.RowJFSAC,
        alignSelf: 'center',
    },
});
