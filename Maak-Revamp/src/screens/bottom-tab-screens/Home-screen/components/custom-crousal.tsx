import React from "react";
import { Image } from "expo-image";
import { commonStyles } from "../../../../styles";
import { TakeSpace } from "../../../../components";
import { Colors, Images } from "../../../../constants";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import moderateScale, { SCREEN_WIDTH } from "../../../../constants/responsive";
type CustomSliderType = { bannerData: any[] };

const CustomSlider = React.memo((props: CustomSliderType) => {
    const { bannerData } = props;
    const flatlistRef = React.useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = React.useState(0);

    const bannerArray = React.useMemo(() => bannerData.length > 0 ? bannerData : [1, 2, 3, 4], [bannerData]);

    const getItemLayout = React.useCallback(
        (data: any, index: number) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
        }), []);

    const handleScroll = React.useCallback((event: any) => {
        const index = Math.round(event?.nativeEvent?.contentOffset.x / SCREEN_WIDTH);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    }, [activeIndex]);

    const renderDotIndicators = React.useMemo(() => {
        return [0, 1, 2, 3].map((dot, index) => (
            <View
                key={index + 1}
                style={[
                    styles.dotCont,
                    {
                        backgroundColor: activeIndex === index ? Colors.activeDot : Colors.black25,
                    },
                ]}
            />
        ));
    }, [activeIndex]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => {
                const nextIndex = prevIndex < bannerArray.length - 1 ? prevIndex + 1 : 0;
                if (flatlistRef.current) {
                    flatlistRef.current.scrollToIndex({ index: nextIndex, animated: true });
                }
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [bannerArray.length]);

    const renderItem = React.useCallback(
        () => (
            <Pressable style={styles.container} onPress={() => { }}>
                <Image
                    source={Images.bannerImg}
                    style={{
                        width: "95%",
                        height: moderateScale(175),
                        borderRadius: moderateScale(20),
                    }}
                />
            </Pressable>
        ), [activeIndex, bannerArray]);

    return (
        <View style={styles.container}>
            <TakeSpace />
            <FlatList
                horizontal
                pagingEnabled
                ref={flatlistRef}
                data={bannerArray}
                renderItem={renderItem}
                onScroll={handleScroll}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(index) => String(index)}
            />
            <TakeSpace space={6} />
            <View style={commonStyles.RowJCAC}>{renderDotIndicators}</View>
            <TakeSpace />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        ...commonStyles.centerJCAC,
        backgroundColor: Colors.white,
    },
    dotCont: {
        height: moderateScale(8),
        width: moderateScale(8),
        borderRadius: moderateScale(10),
        marginHorizontal: moderateScale(2),
    },
});

export default CustomSlider;