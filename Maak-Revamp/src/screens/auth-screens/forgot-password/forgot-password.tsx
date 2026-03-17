import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaInsect } from '../../../hooks';

const ForgotPassword = () => {
    const renderItem = () => {
        return <Text>Forgot Password</Text>
    }
    return <SafeAreaInsect
        data={[1]}
        renderItem={renderItem}
    />
}

export default ForgotPassword
const styles = StyleSheet.create({})