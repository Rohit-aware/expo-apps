import React from 'react';
import { commonStyles } from '../../../../styles';
import { TransactionSection } from '../use-payment';
import fontStyles from '../../../../styles/font-styles';
import { Colors, moderateScale } from '../../../../constants';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

type TextProps = { style: TextStyle, label: string };
export const TextWrapper = React.memo<TextProps>(({ style, label }) => (
    <Text style={[style]} numberOfLines={1} ellipsizeMode='tail'>
        {label}
    </Text>
));
export const Wrapper = React.memo<React.PropsWithChildren<{}>>(({ children }) => (
    <View style={styles.wrapperCont}>{children}</View >
));


const RenderSectionHeader: ({ section }: { section: TransactionSection }) => React.JSX.Element =
    ({ section }) => {
        const { month, year, yearlyProfit } = section.title
        return (
            <View style={styles.headerCont}>
                <Wrapper >
                    <TextWrapper label={year} style={styles.subtitle} />
                    <TextWrapper label='Total' style={styles.subtitle} />
                </Wrapper>
                <Wrapper >
                    <TextWrapper label={month} style={fontStyles.notoSansSemiBold14} />
                    <TextWrapper label={yearlyProfit} style={fontStyles.notoSansBold14} />
                </Wrapper>
            </View>
        )
    };

export default RenderSectionHeader;

const styles = StyleSheet.create({
    wrapperCont: { ...commonStyles.RowJSBAC, paddingVertical: moderateScale(2) },
    subtitle: { ...fontStyles.notoSansRegular10, color: Colors.black50 },
    headerCont: {
        ...commonStyles.columnJFS,
        backgroundColor: Colors.black03,
        borderRadius: moderateScale(8),
        padding: moderateScale(10)
    }
})