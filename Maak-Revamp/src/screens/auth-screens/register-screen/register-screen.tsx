import React from 'react';
import { ListRenderItem } from 'react-native';
import { SafeAreaInsect } from '../../../hooks';
import { useRegisterHook } from './useRegister';
import BottomTile from '../components/bottom-tile';
import AuthHeader from '../components/auth-header';
import { InputFieldProps } from '../../../components/common/interface';
import { CustomButton, InputField, TakeSpace } from '../../../components';


const Register = () => {

    const {
        toLogin,
        showPass,
        userInputs,
        showCnfPass,
        toBottomTab,
    } = useRegisterHook();


    const renderRegisterItem: ListRenderItem<InputFieldProps> = React.useCallback(
        ({ item, index }) => {
            return (
                <InputField
                    key={index}
                    Icon={item['Icon']}
                    label={item['label']}
                    value={item['value']}
                    showIcon={item['showIcon']}
                    rightIcon={item['rightIcon']}
                    onPressIcon={item['onPressIcon']}
                    placeholder={item['placeholder']}
                    onChangeText={item['onChangeText']}
                    secureTextEntry={item['secureTextEntry']}
                    keyBoardType={item['keyBoardType']}
                    maxLength={item['maxLength']}
                />
            );
        }, [showPass, showCnfPass, userInputs]);


    const renderFootorComp = React.useCallback(() => (
        <>
            <TakeSpace />
            <CustomButton
                label='Sign up'
                onPress={toBottomTab}
            />
            <TakeSpace />
            <BottomTile
                firstLabel='Already have an account? '
                secondLabel='Login'
                onPress={toLogin}
            />
            <TakeSpace space={16} />
            <BottomTile
                smallTxt
                firstLabel='By signing in I accept the'
                secondLabel='Terms & Conditions'
                onPress={() => { }}
            />
            <TakeSpace space={16} />
        </>
    ), []);


    const renderListHeader = React.useCallback(() => (
        <AuthHeader
            title="Create a new account"
            subTitle="Join our community and unlock exclusive features and elevate yourself!"
        />
    ), []);

    return (
        <SafeAreaInsect
            data={[1]}
            renderItem={renderRegisterItem}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderListHeader}
            ListFooterComponent={renderFootorComp}
            keyExtractor={(item, index) => String(index)}
            ItemSeparatorComponent={() => <TakeSpace space={6} />}
        />
    );
};

export default Register;