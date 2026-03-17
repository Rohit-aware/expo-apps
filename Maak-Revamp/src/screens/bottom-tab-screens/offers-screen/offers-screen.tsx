import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaInsect } from '../../../hooks';
import { Header } from '../../../components';

const Offers = () => {
    return (
        <SafeAreaInsect data={[1]}
            renderItem={undefined}
            ListHeaderComponent={<Header title='Offers' showArrow={false} />}
        />
    )
}

export default Offers

const styles = StyleSheet.create({})