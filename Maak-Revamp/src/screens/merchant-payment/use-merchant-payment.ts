import React from "react";

const useMerchantBooking = () => {
    const [search, setSearch] = React.useState<string>('');
    const onChangeText = (value: string) => setSearch(value);
    const onPress = () => { }
    return {
        search,
        onPress,
        onChangeText,
    };
};
export { useMerchantBooking }