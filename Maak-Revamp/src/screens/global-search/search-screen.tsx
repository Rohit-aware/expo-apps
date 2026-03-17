import React from 'react';
import { SafeAreaInsect } from '../../hooks';
import { useGlobalSearch } from './use-search';
import { moderateScale } from '../../constants';
import fontStyles from '../../styles/font-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Header, ProgressBar, TakeSpace } from '../../components';
import { ServiceList, SearchMessage, SearchHistory } from './components';

const Space20 = () => <TakeSpace space={20} />;

const HeaderTxtTile = React.memo(({ label }: { label: string }) => (
    <Text style={styles.headerTxt}>{label}</Text>
));

const Padd16Wrapper: React.FC<React.PropsWithChildren<{ size?: number }>> =
    ({ size = 16, children }) => (
        <View style={{ paddingHorizontal: moderateScale(size) }}>
            {children}
        </View>
    );

const GlobaSearch = () => {

    const {
        search,
        progress,
        onChangeText,
        removeSearch,
        searchHistory,
    } = useGlobalSearch();


    const renderSeach = React.useCallback(() => {
        return (
            <>
                {search ?
                    <View />
                    :
                    <View>
                        <Padd16Wrapper>
                            <SearchHistory searches={searchHistory} onPress={removeSearch} />
                        </Padd16Wrapper>
                        <TakeSpace />
                        <Padd16Wrapper><HeaderTxtTile label='Top Service Providers' /></Padd16Wrapper>
                        <ServiceList />
                        <Padd16Wrapper><SearchMessage /></Padd16Wrapper>
                        <ServiceList />
                    </View>
                }
            </>
        );
    }, [search, searchHistory]);

    return <SafeAreaInsect
        data={[1]}
        renderItem={renderSeach}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={Space20}
        ListHeaderComponent={
            <View>
                <Header
                    variant='search'
                    search={search}
                    onChangeText={(value) => onChangeText(value)}
                />
                <TakeSpace space={4} />
                <ProgressBar progress={progress} />
            </View>

        }
    />

}

export default GlobaSearch;

const styles = StyleSheet.create({
    headerTxt: { ...fontStyles.notoSansSemiBold16 },
})