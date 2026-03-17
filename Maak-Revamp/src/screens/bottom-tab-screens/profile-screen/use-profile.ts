import { SectionProps } from "./interface";
import { navigationHook } from "../../../hooks";

const useProfile = () => {

    const { navigateTo } = navigationHook();

    const sections: Array<SectionProps> = [
        {
            title: 'Payments',
            data: [
                { id: 1, onPress: () => navigateTo('MerchantPayment'), label: 'Merchant Payment', show: true },
                { id: 2, onPress: () => navigateTo('MerchantBooking'), label: 'Merchant Bookings', show: true },
                { id: 3, onPress: () => navigateTo('Payments'), label: 'My Payments', show: true },
                { id: 4, onPress: () => navigateTo('MyBooking'), label: 'My Booking', show: true },
                { id: 5, onPress: () => navigateTo('BottomTab'), label: 'On customer’s behalf', show: true }
            ]
        },
        {
            title: 'Other',
            data: [
                { id: 1, onPress: () => navigateTo('BottomTab'), label: 'Referral', show: true },
                { id: 2, onPress: () => navigateTo('BottomTab'), label: 'About us', show: true },
                { id: 3, onPress: () => navigateTo('BottomTab'), label: 'Change language', show: true },
                { id: 4, onPress: () => navigateTo('BottomTab'), label: 'Terms & Conditions', show: true },
                { id: 5, onPress: () => navigateTo('BottomTab'), label: 'FAQ’s', show: true },
                { id: 6, onPress: () => navigateTo('BottomTab'), label: 'Extra', show: true },
                { id: 7, onPress: () => navigateTo('BottomTab'), label: 'Delete Account', show: true, isDelete: true },
                { id: 8, onPress: () => navigateTo('Login'), label: 'Logout', show: true }
            ]
        }
    ]

    return {
        sections,
        navigateTo,
    };
};
export { useProfile };