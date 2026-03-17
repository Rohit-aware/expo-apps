
import { BottomTabNavigationProp, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type MainStackParamList = {
    Login: undefined;
    Register: undefined;
    MyBooking: undefined;
    Editprofile: undefined;
    GlobaSearch: undefined;
    ForgotPassword: undefined;
    MerchantPayment: undefined;
    MerchantBooking: undefined;
    MerchBookingDetails: undefined;
    BottomTab: BottomTabParamList;
};

type BottomTabParamList = {
    Home: { name: string };
    Offers: undefined;
    ScanQr: undefined;
    Payments: undefined;
    Profile: undefined;
};

type MainStackProps = NativeStackNavigationProp<MainStackParamList>;
type BottomTabProps = BottomTabNavigationProp<BottomTabParamList>;

type CombinedNavigationProp = MainStackProps & BottomTabProps;

type NavigateParams<T extends keyof MainStackParamList | keyof BottomTabParamList> =
    T extends "BottomTab"
    ? { screen: keyof BottomTabParamList; params?: BottomTabParamList[keyof BottomTabParamList] }
    : T extends keyof MainStackParamList
    ? MainStackParamList[T]
    : never;

type ResetNavigationParams<
    T extends keyof MainStackParamList | keyof BottomTabParamList,
    K extends keyof BottomTabParamList | undefined = undefined
> = K extends 'BottomTab'
    ? T extends keyof MainStackParamList
    ? MainStackParamList[T]
    : T extends keyof BottomTabParamList
    ? BottomTabParamList[T]
    : never
    : K extends keyof BottomTabParamList
    ? Array<{ screen: K; params?: BottomTabParamList[K] }>
    : never;

// use thiese if you want to 
// const Home = ({ navigation, route }: HomeScreenProps) => { } navigaion and route like this just pass screen name
type BottomTabScreenNavigationProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<BottomTabParamList, T>;

type HomeStackScreenNavigationProps<T extends keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList, T>;

type HomeScreenNavigationProps<T extends keyof MainStackParamList> = CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, 'Home'>,
    NativeStackScreenProps<MainStackParamList, T>
>;

export type {
    NavigateParams,
    BottomTabParamList,
    MainStackParamList,
    ResetNavigationParams,
    CombinedNavigationProp,
    HomeScreenNavigationProps,
    BottomTabScreenNavigationProps,
    HomeStackScreenNavigationProps,
}