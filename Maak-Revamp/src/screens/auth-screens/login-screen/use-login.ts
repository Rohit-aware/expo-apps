import React from "react";
import { navigationHook } from "../../../hooks";


const useLoginHook = () => {

    const { navigateTo } = navigationHook();
    const [userPromt, setUserPromt] = React.useState({
        phone: '',
        password: '',
        show: false
    });

    const onChangeText = (label: 'phone' | 'password', value: string) =>
        setUserPromt(prev => ({ ...prev, [label]: value }));

    const toggle = React.useCallback(() => setUserPromt(prev => ({ ...prev, show: !prev.show })), []);

    const toForgotPassword = React.useCallback(() => navigateTo('ForgotPassword'), []);
    const toRegister = React.useCallback(() => navigateTo('Register'), []);
    const onPressLogin = React.useCallback(() => navigateTo('BottomTab', { screen: 'Home' }), []);

    return {
        toggle,
        userPromt,
        toRegister,
        onChangeText,
        onPressLogin,
        toForgotPassword,
    };
};
export { useLoginHook };