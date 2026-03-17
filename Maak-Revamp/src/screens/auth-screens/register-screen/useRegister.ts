import React from "react";
import { navigationHook } from "../../../hooks";
import { InputFieldProps } from "../../../components/common/interface";
import { CloseEye, ContactSvg, KeySvg, OpenEye } from '../../../assets/icons';

interface UserInputs {
    name: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    jobType: string;
    homeArea: string;
    referralId: string;
}


const useRegisterHook = () => {
    const [showPass, setShowPass] = React.useState(false);
    const [showCnfPass, setShowCnfPass] = React.useState(false);
    const [userInputs, setUserInputs] = React.useState<UserInputs>({
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        jobType: '',
        homeArea: '',
        referralId: '',
    });

    const onChangeText = React.useCallback((field: keyof UserInputs, value: string) => {
        setUserInputs(prev => ({ ...prev, [field]: value }));
    }, []);

    const { navigateTo } = navigationHook();

    const toBottomTab = React.useCallback(() => navigateTo('BottomTab', { screen: 'Home' }), [])
    const toLogin = React.useCallback(() => navigateTo('Login'), [])

    const toggle = React.useCallback((field: 'password' | 'confirmPassword') => {
        if (field === 'password') {
            setShowPass(prevState => !prevState);
        } else if (field === 'confirmPassword') {
            setShowCnfPass(prevState => !prevState);
        }
    }, [showCnfPass, showPass]);

    const inputFields = React.useMemo<Array<InputFieldProps>>(() => [
        {
            label: 'Name',
            placeholder: 'Enter your name',
            value: userInputs['name'],
            Icon: ContactSvg,
            onChangeText: (value: string) => onChangeText('name', value),
            showIcon: false
        },
        {
            label: 'Mobile number',
            placeholder: 'Enter your mobile number',
            value: userInputs['mobile'],
            Icon: ContactSvg,
            showIcon: false,
            maxLength: 10,
            keyBoardType: 'number-pad',
            onChangeText: (value: string) => onChangeText('mobile', value),
        },
        {
            label: 'Password',
            placeholder: 'Enter your password',
            value: userInputs['password'],
            Icon: KeySvg,
            secureTextEntry: true,
            rightIcon: showPass ? OpenEye : CloseEye,
            onChangeText: (value: string) => onChangeText('password', value),
            onPressIcon: () => toggle('password'),
            textContentType: 'password'
        },
        {
            label: 'Confirm Password',
            placeholder: 'Enter your confirm password',
            value: userInputs['confirmPassword'],
            Icon: KeySvg,
            secureTextEntry: true,
            rightIcon: showCnfPass ? OpenEye : CloseEye,
            onChangeText: (value: string) => onChangeText('confirmPassword', value),
            onPressIcon: () => toggle('confirmPassword'),
            textContentType: 'newPassword'
        },
        {
            label: 'Referral ID',
            placeholder: 'Enter referral id',
            value: userInputs['referralId'],
            Icon: undefined,
            onChangeText: (value: string) => onChangeText('referralId', value),
        }
    ], [showPass, showCnfPass, userInputs]);



    return {
        toLogin,
        showPass,
        userInputs,
        toBottomTab,
        showCnfPass,
        inputFields,
    };
};
export { useRegisterHook };