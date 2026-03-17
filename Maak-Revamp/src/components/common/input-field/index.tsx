import React from 'react';
import { InputFieldProps } from '../interface';
import { commonStyles } from '../../../styles';
import fontStyles from '../../../styles/font-styles';
import { Colors, moderateScale } from '../../../constants';
import { Pressable, StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native';


const InputField: React.FC<InputFieldProps> = React.memo((props) => {
    const {
        Icon,
        label,
        onBlur,
        onPress,
        mandatory,
        rightIcon,
        rootStyle,
        labelStyle,
        onPressIcon,
        inputTxtStyle,
        showIcon = true,
        textContentType,
        textContinerStyle,
        countryCode = '20',
        isMultiLine = false,
        removeLeftIcon = false,
        keyBoardType = 'default',
    } = props;

    const { middleContWidth, leftIconContWidth } = React.useMemo(() => {
        let leftWidth = '15%';
        let middleWidth = '85%';

        if (removeLeftIcon) {
            leftWidth = '0';
            middleWidth = '90%';
        } else if (showIcon) {
            leftWidth = '10%';
            middleWidth = rightIcon ? '80%' : '90%';
        } else if (rightIcon) {
            middleWidth = '84%';
        }

        return {
            middleContWidth: { width: middleWidth } as ViewStyle,
            leftIconContWidth: { width: leftWidth } as ViewStyle,
        };
    }, [showIcon, rightIcon, removeLeftIcon]);


    const renderLeftSide = React.useCallback(() => {
        if (showIcon) {
            return !!Icon && React.createElement(Icon);
        }
        return (
            <View style={styles.codeCont}>
                <Text style={styles.textStyle}>+{countryCode}</Text>
            </View>
        );
    }, [showIcon, Icon, countryCode]);

    return (
        <View style={[styles.container, rootStyle]}>
            {label && (
                <Text style={[styles.textStyle, { paddingLeft: 3 }, labelStyle]}>
                    {label} {mandatory && <Text style={[styles.textStyle, { color: Colors.primaryColor }]}>*</Text>}
                </Text>
            )}
            <View style={[styles.textCont, textContinerStyle]}>
                <View style={[styles.LeftCont, leftIconContWidth]}>{renderLeftSide()}</View>
                <Pressable style={middleContWidth} onPress={onPress}>
                    <TextInput
                        onBlur={onBlur}
                        multiline={isMultiLine}
                        textAlignVertical="center"
                        keyboardType={keyBoardType}
                        cursorColor={Colors.textBlack}
                        textContentType={textContentType}
                        numberOfLines={isMultiLine ? 4 : 1}
                        style={[styles.inputStyle, inputTxtStyle]}
                        placeholderTextColor={Colors.black25}
                        {...props}
                    />
                </Pressable>
                {!!rightIcon && (
                    <Pressable style={styles.rightCont} onPress={onPressIcon}>
                        {React.createElement(rightIcon)}
                    </Pressable>
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginHorizontal: moderateScale(16),
    },
    textCont: {
        ...commonStyles.RowJFSAC,
        borderColor: Colors.black25,
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(6),
        marginVertical: moderateScale(10),
        paddingHorizontal: moderateScale(6),
        flexDirection: 'row',
        alignItems: 'center',
    },
    codeCont: {
        paddingRight: moderateScale(10),
        borderRightColor: Colors.black25,
        borderRightWidth: moderateScale(1),
        marginHorizontal: moderateScale(6),
    },
    textStyle: { ...fontStyles.notoSansMedium14 },
    LeftCont: { alignItems: 'center' },
    rightCont: { width: '10%', alignItems: 'center' },
    inputStyle: {
        ...fontStyles.notoSansRegular14,
        flex: 1,
        height: moderateScale(40),
        minHeight: moderateScale(40),
    },
});

export default InputField;
