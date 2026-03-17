import { useNavigation, CommonActions } from "@react-navigation/native";
import { BottomTabParamList, MainStackParamList, CombinedNavigationProp, NavigateParams, ResetNavigationParams } from "../../route/interface";

const navigationHook = () => {
    const navigation = useNavigation<CombinedNavigationProp>();

    const navigateTo = <T extends keyof MainStackParamList | keyof BottomTabParamList>(
        module: T,
        params?: NavigateParams<T>
    ) => {
        navigation.navigate(module as any, params as any);
    };


    const navigateReplace = <T extends keyof MainStackParamList | keyof BottomTabParamList>(
        module: T,
        params?: NavigateParams<T>
    ) => {
        navigation.replace(module as any, params as any);
    };


    const navigateReset = <
        T extends keyof MainStackParamList | keyof BottomTabParamList,
        K extends keyof BottomTabParamList | undefined = undefined
    >(
        name: T,
        params?: ResetNavigationParams<T, K>
    ) => {
        navigation.reset({
            index: 0,
            routes: [{ name: name as any, params: params as any }],
        });
    };


    const navigateBack = () => {
        navigation.goBack();
    };

    const navigatePush = <T extends keyof MainStackParamList | keyof BottomTabParamList>(
        module: T,
        params?: NavigateParams<T>
    ) => {
        navigation.push(module as any, params as any);
    };


    const navigateDispatch = <
        T extends keyof MainStackParamList | keyof BottomTabParamList,
        K extends keyof BottomTabParamList | undefined = undefined
    >(
        name: T,
        params?: ResetNavigationParams<T, K>
    ) => {
        navigation.dispatch({
            ...CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: "DrawerNav",
                        params: { screen: "BottomTab" },
                    },
                    { name: name as any, params: params as any },
                ],
            }),
        });
    };


    return {
        navigateTo,
        navigateReplace,
        navigateReset,
        navigatePush,
        navigateBack,
        navigateDispatch,
        navigation,
    };
};

export default navigationHook;