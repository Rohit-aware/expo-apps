import React from "react";
import TakeSpace from "../take-space";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Colors, moderateScale } from "../../../constants";

type WhiteWrapperProps = React.PropsWithChildren<{
    rootStyle?: ViewStyle,
    useSpace?: boolean
}>

const WhiteWrapper: React.FC<WhiteWrapperProps> = React.memo(
    ({ children, rootStyle, useSpace = true }) => (
        <>
            <View style={[styles.whiteWrapperCont, rootStyle]}>
                {useSpace && <TakeSpace />}
                {children}
            </View>
            <TakeSpace space={2} />
        </>
    )
);

export default WhiteWrapper;
const styles = StyleSheet.create({
    whiteWrapperCont: {
        backgroundColor: Colors.white,
        paddingHorizontal: moderateScale(16)
    }
})