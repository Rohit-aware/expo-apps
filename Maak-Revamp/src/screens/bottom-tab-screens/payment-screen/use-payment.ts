import React from "react";
import { Images } from "../../../constants";
import { ImageProps } from "react-native";

interface TransactionItem {
    id: number;
    image: ImageProps;
    productName: string;
    restaurantName: string;
    amount: string;
    date: string;
    status: 'Failed' | 'Success' | 'Pending'
}

type titleType = {
    year: string;
    month: string;
    yearlyProfit: string;
}
interface TransactionSection {
    title: titleType;
    data: TransactionItem[];
}

const useMyPayment = () => {

    const [search, setSearch] = React.useState<string>('');
    const [show, setShow] = React.useState<boolean>(false);
    const onChangeText = (value: string) => setSearch(value);
    const showMdal = React.useCallback(() => setShow(true), []);
    const hideMdal = React.useCallback(() => setShow(false), []);
    const [transaction] = React.useState<TransactionSection[]>([{
        title: {
            month: 'September',
            year: '2024',
            yearlyProfit: 'EGP 25000'
        },
        data: [
            {
                id: 1,
                image: Images.transaction_image,
                productName: 'Food Good',
                restaurantName: 'Restaurant',
                amount: 'EGP 254',
                date: '25 Sept',
                status: 'Failed',
            },
            {
                id: 2,
                image: Images.transaction_image,
                productName: 'Food Good',
                restaurantName: 'Restaurant',
                amount: 'EGP 254',
                date: '25 Sept',
                status: 'Pending',
            },
            {
                id: 3,
                image: Images.transaction_image,
                productName: 'Food Good',
                restaurantName: 'Restaurant',
                amount: 'EGP 254',
                status: 'Success',
                date: '25 Sept',
            },
        ]
    }])


    return {
        show,
        search,
        showMdal,
        hideMdal,
        transaction,
        onChangeText,
    };
};
export { useMyPayment };
export type { TransactionItem, TransactionSection, titleType };