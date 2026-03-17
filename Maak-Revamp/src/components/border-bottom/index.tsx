import React from 'react';
import { Colors, moderateScale } from '../../constants';
import { StyleSheet, View, ViewStyle } from 'react-native';

const BorderBottom = React.memo((props: { space?: number, rootStyles?: ViewStyle }) => {
    const { space = 6, rootStyles } = props
    return (
        <View style={[styles.borderBottom, { paddingVertical: moderateScale(space) }, rootStyles]} />
    )
})

export default BorderBottom;

const styles = StyleSheet.create({
    borderBottom: {
        borderBottomWidth: moderateScale(1),
        borderBottomColor: Colors.black05,
    },
})