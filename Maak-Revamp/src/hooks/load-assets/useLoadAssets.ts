import { useFonts } from "expo-font";

export function useLoadAssets() {
    const [fontsLoaded] = useFonts({
        NotoSansRegular: require('../../assets/fonts/NotoSans-Regular.ttf'),
        NotoSansBold: require('../../assets/fonts/NotoSans-Bold.ttf'),
        NotoSansSemiBold: require('../../assets/fonts/NotoSans-SemiBold.ttf'),
        NotoSansExtraBold: require('../../assets/fonts/NotoSans-ExtraBold.ttf'),
        NotoSansMedium: require('../../assets/fonts/NotoSans-Medium.ttf'),
    });

    return fontsLoaded;
}