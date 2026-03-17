import { ComponentType } from 'react';

export type LazyScreen = () => ComponentType<any>;

const screens = {
    MyBooking: () => require('../screens/my-booking/my-booking').default,
    GlobaSearch: () => require('../screens/global-search/search-screen').default,
    Login: () => require('../screens/auth-screens/login-screen/login-screen').default,
    Home: () => require('../screens/bottom-tab-screens/Home-screen/home-screen').default,
    MerchantPayment: () => require('../screens/merchant-payment/merchant-payment').default,
    MerchantBooking: () => require('../screens/merchant-booking/merchant-booking').default,
    Offers: () => require('../screens/bottom-tab-screens/offers-screen/offers-screen').default,
    Register: () => require('../screens/auth-screens/register-screen/register-screen').default,
    ScanQr: () => require('../screens/bottom-tab-screens/scan-qr-screen/scan-qr-screen').default,
    Profile: () => require('../screens/bottom-tab-screens/profile-screen/profile-screen').default,
    Payments: () => require('../screens/bottom-tab-screens/payment-screen/payments-screen').default,
    ForgotPassword: () => require('../screens/auth-screens/forgot-password/forgot-password').default,
    MerchBookingDetails: () => require('../screens/merchant-booking-details/merch-booking-details').default,
    Editprofile: () => require('../screens/edit-profile/edit-profile').default,
} satisfies Record<string, LazyScreen>;

export { screens };