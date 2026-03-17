import React from 'react';
import { Colors } from '../../../constants';
import { TakeSpace } from '../../../components';
import fontStyles from '../../../styles/font-styles';
import { StyleSheet, Text, View } from 'react-native';
import { BigSearchIcon } from '../../../assets/icons';

const SearchMessage = React.memo(() => {
    return (
        <View style={styles.container}>
            <TakeSpace space={20} />
            <BigSearchIcon />
            <TakeSpace space={20} />
            <Text style={styles.searchTxt}>Looking for something specific? Start typing…</Text>
            <TakeSpace space={20} />
        </View>
    );
});

export default SearchMessage;

const styles = StyleSheet.create({
    container: { justifyContent: 'center' },
    searchTxt: {
        ...fontStyles.notoSansMedium14,
        color: Colors.black50,
        textAlign: 'center',
        alignSelf: 'center',
        width: '70%',
    }
});