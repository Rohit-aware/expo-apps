import { commonStyles } from '../../../styles';
import React, { PropsWithChildren } from 'react';
import fontStyles from '../../../styles/font-styles';
import { Colors, moderateScale } from '../../../constants';
import { Pressable, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';

type CustomButtonProps = PropsWithChildren & {
    label: string;
    onPress: () => void;
    rootStyle?: ViewStyle | ViewStyle[];
    labelStyle?: TextStyle | TextStyle[];
}

const CustomButton = (props: CustomButtonProps) => {

    const {
        label,
        onPress,
        children,
        rootStyle,
        labelStyle,
    } = props;

    return (
        <Pressable style={[styles.container, rootStyle]} onPress={onPress}>
            {children || <Text style={[styles.labelTxt, labelStyle]}>{label}</Text>
            }
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        padding: moderateScale(10),
        ...commonStyles.centerJCAC,
        borderRadius: moderateScale(40),
        marginVertical: moderateScale(10),
        backgroundColor: Colors.primaryColor,
    },
    labelTxt: {
        ...fontStyles.notoSansSemiBold16,
        color: Colors.textWhite
    }
})