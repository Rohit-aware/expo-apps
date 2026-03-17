import React from "react";

const useMyBooking = () => {
    const [search, setSearch] = React.useState<string>('');
    const onChangeText = (value: string) => setSearch(value);
    return {
        search,
        onChangeText,
    };
};
export { useMyBooking }