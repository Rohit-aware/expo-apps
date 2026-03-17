import React from 'react';
import { useHomeHook } from './use-home';
import { SafeAreaInsect } from '../../../hooks';
import HomeHeader from './components/home-header';
import ServiceList from './components/service-list';
import fontStyles from '../../../styles/font-styles';
import OfferBanners from './components/offer-banners';
import { StyleSheet, Text, View } from 'react-native';
import CustomSlider from './components/custom-crousal';
import ManageURMoney from './components/mange-ur-money';
import { Colors, moderateScale } from '../../../constants';
import RecentTransaction from './components/recent-trasaction';
import ServicesSection from './components/render-service-tile';
import { CustomButton, TakeSpace, WhiteWrapper } from '../../../components';
import { useColdStartNavigation } from './hook/use-cold-start';

type CommonProps = { label?: string; onPress?: () => void; }

const HeaderTile = React.memo<CommonProps>(
    ({ label }) => (
        <Text style={styles.headerTxt}>{label}</Text>
    ));

const ViewAll = React.memo<CommonProps>(
    ({ onPress }) => (
        <CustomButton
            label="View All"
            onPress={onPress!}
            rootStyle={styles.footCont}
            labelStyle={styles.viewAllText}
        />
    ));

/*
    After some data change if component still not changing ui values then remove memo from wrapperComponent 
    and also try adding required dependancies in useCallback
*/
const ViewAllPress = () => <ViewAll onPress={() => { }} />;
const Space20 = () => <TakeSpace space={20} />;

const Home = () => {

    const { transactions } = useHomeHook();
    const { checkInitialNotification } = useColdStartNavigation();



    const renderHome = React.useCallback(() => (
        <View>
            <View style={styles.backCont}>
                <WhiteWrapper>
                    <HeaderTile label="Near by services" />
                    <ServicesSection
                        data={[1, 2, 3, 4, 5, 6, 7, 8]}
                        ListFooterComponent={ViewAllPress}
                    />
                </WhiteWrapper>

                <WhiteWrapper rootStyle={styles.offerCont}>
                    <CustomSlider bannerData={[]} />
                </WhiteWrapper>

                <WhiteWrapper >
                    <HeaderTile label="Near by services" />
                    <ServicesSection
                        data={[1, 2, 3, 4]}
                        ListFooterComponent={ViewAllPress}
                    />
                </WhiteWrapper>

                <WhiteWrapper>
                    <HeaderTile label="Recent transaction" />
                    <RecentTransaction
                        data={transactions}
                        ListFooterComponent={ViewAllPress}
                    />
                </WhiteWrapper>

                <WhiteWrapper rootStyle={styles.offerCont}>
                    <OfferBanners data={['1', '2', '3', '4']} />
                </WhiteWrapper>

                <WhiteWrapper>
                    <HeaderTile label="Manage your money" />
                    <ManageURMoney data={[1, 2]} />
                </WhiteWrapper>

                <WhiteWrapper rootStyle={styles.offerCont}>
                    <View style={{ paddingLeft: moderateScale(16) }}>
                        <HeaderTile label="Featured Offers" />
                    </View>
                    <ServiceList data={transactions} />
                </WhiteWrapper>

                <WhiteWrapper>
                    <HeaderTile label="Popular services" />
                    <ServicesSection
                        data={[1, 2, 3, 4]}
                        ListFooterComponent={ViewAllPress}
                    />
                </WhiteWrapper>
            </View>
        </View>
    ), []);


    React.useEffect(() => {
        const timeout = setTimeout(() => {
            checkInitialNotification();
        }, 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <SafeAreaInsect
            data={[1]}
            renderItem={renderHome}
            ListFooterComponent={Space20}
            ListHeaderComponent={<HomeHeader />}
        />
    )
};

export default Home;

const styles = StyleSheet.create({
    backCont: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
        paddingVertical: moderateScale(16),
    },
    offerCont: { paddingHorizontal: 0 },
    headerTxt: { ...fontStyles.notoSansSemiBold16 },
    viewAllText: { ...fontStyles.notoSansMedium12, color: Colors.secColor, },
    footCont: {
        width: '22%',
        paddingVertical: moderateScale(6),
        backgroundColor: Colors.fadedSec
    },
});