import React from 'react';
import { useLoginHook } from './use-login';
import { SafeAreaInsect } from '../../../hooks';
import { StyleSheet, Text } from 'react-native';
import BottomTile from '../components/bottom-tile';
import AuthHeader from '../components/auth-header';
import fontStyles from '../../../styles/font-styles';
import { Colors, moderateScale } from '../../../constants';
import { CloseEye, KeySvg, OpenEye } from '../../../assets/icons';
import { CustomButton, InputField, TakeSpace } from '../../../components';

const Login = () => {

    const {
        toggle,
        userPromt,
        toRegister,
        onChangeText,
        onPressLogin,
        toForgotPassword,
    } = useLoginHook();


    const renderLogin = React.useCallback(() => {
        return (
            <>
                <TakeSpace space={20} />
                <InputField
                    maxLength={10}
                    showIcon={false}
                    label='Mobile number'
                    value={userPromt['phone']}
                    placeholder={'Enter your mobile number'}
                    onChangeText={(value) => onChangeText('phone', value)}
                />
                <TakeSpace space={10} />
                <InputField
                    label='Password'
                    Icon={KeySvg}
                    onPressIcon={toggle}
                    secureTextEntry={true}
                    textContentType='password'
                    value={userPromt['password']}
                    placeholder={'Enter your password'}
                    rightIcon={userPromt.show ? OpenEye : CloseEye}
                    onChangeText={(value) => onChangeText('password', value)}
                />
                <Text style={styles.forgotPassTxt} onPress={toForgotPassword}>Forgot password ?</Text>
                <TakeSpace space={30} />
                <CustomButton label='Login' onPress={onPressLogin} />
                <TakeSpace space={10} />
                <BottomTile
                    firstLabel='Don’t have an account?'
                    secondLabel='Register'
                    onPress={toRegister}
                />
                <TakeSpace space={30} />
            </>
        );
    }, [userPromt])

    const renderListHeader = React.useCallback(() => (
        <AuthHeader
            title='Log into your account'
            subTitle='Enter your credentials to log in and access your account'
        />
    ), []);

    return <SafeAreaInsect
        data={[1]}
        renderItem={renderLogin}
        ListHeaderComponent={renderListHeader}
        keyExtractor={(index) => String(index)}
    />

};

const styles = StyleSheet.create({
    forgotPassTxt: {
        ...fontStyles.notoSansSemiBold12,
        textAlign: 'right',
        color: Colors.secColor,
        paddingRight: moderateScale(22)
    }
});

export default Login;