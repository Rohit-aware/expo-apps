import React from "react";
import { navigationHook } from "../../hooks";
const useMerchantBooking = () => {
    const { navigateTo } = navigationHook();
    const [search, setSearch] = React.useState<string>('');
    const onChangeText = (value: string) => setSearch(value);
    const onPress = () => navigateTo('MerchBookingDetails');
    return {
        search,
        onPress,
        onChangeText,
    };
};
export { useMerchantBooking };