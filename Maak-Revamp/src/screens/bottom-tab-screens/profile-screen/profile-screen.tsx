import React from 'react';
import { useProfile } from './use-profile';
import { SafeAreaInsect } from '../../../hooks';
import fontStyles from '../../../styles/font-styles';
import { ActivitySection, UserTile } from './components';
import { SectionItem, SectionProps } from './interface';
import { Colors, moderateScale } from '../../../constants';
import { AppNameLogo, ForwardArrow } from '../../../assets/icons';
import { ListRenderItem, SectionList, StyleSheet, Text, TextStyle, View } from 'react-native';
import { BorderBottom, InputField, TakeSpace, WhiteWrapper } from '../../../components';


type CommonProps = {
    label?: string;
    show?: boolean;
    isDelete?: boolean;
    hideBorder?: boolean;
    onPress?: () => void;
    textStyle?: TextStyle;
};

const ForwardArrowIcon = (isDelete: boolean) => <ForwardArrow active={isDelete} />

const HeaderTile = React.memo<CommonProps>(({ label, textStyle }) => (
    <Text style={[styles.headerTitle, textStyle]}>{label}</Text>
));

const Tile = React.memo<CommonProps>(({ label, isDelete = false, hideBorder = true, textStyle, onPress }) => {
    return (
        <>
            <InputField
                value={label}
                editable={false}
                removeLeftIcon
                onPress={onPress}
                rootStyle={styles.rootStyle}
                textContinerStyle={styles.textCont}
                inputTxtStyle={[styles.inputText, textStyle!]}
                rightIcon={() => ForwardArrowIcon(isDelete)}
            />
            {hideBorder && <BorderBottom space={0} />}
        </>
    )
});

const Profile = () => {
    const { sections } = useProfile();

    const renderItem: ListRenderItem<SectionItem> =
        ({ item }) => {
            const { label, onPress, isDelete, hideBorder } = item;
            return (
                <Tile
                    key={label}
                    label={label}
                    onPress={onPress}
                    isDelete={isDelete}
                    hideBorder={hideBorder}
                    textStyle={isDelete ? styles.deletTxt : undefined}
                />
            );
        };


    const renderSectionHeader = ({ section }: { section: { title: string } }) => (
        <WhiteWrapper useSpace={false} rootStyle={{ paddingHorizontal: 0 }}>
            <TakeSpace />
            <HeaderTile label={section.title} />
        </WhiteWrapper>
    );

    const renderListFooter = React.useCallback(() => (
        <>
            <TakeSpace space={20} />
            <AppNameLogo style={{ opacity: 0.5, alignSelf: 'center' }} color={Colors.primaryColor} />
            <TakeSpace />
            <Text style={styles.appVersion}>0.0.1v</Text>
            <TakeSpace space={20} />
        </>
    ), []);

    const renderProfile = React.useCallback(() => (
        <View style={styles.container}>
            <TakeSpace space={2} />
            <WhiteWrapper useSpace={false}>
                <TakeSpace />
                <HeaderTile label="Activity" textStyle={fontStyles.notoSansMedium14} />
                <ActivitySection />
            </WhiteWrapper>
            <WhiteWrapper useSpace={false} >
                <SectionList<SectionItem, SectionProps>
                    sections={sections}
                    scrollEnabled={false}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    renderSectionHeader={renderSectionHeader}
                    keyExtractor={(item, index) => String(item.id)}
                    ListFooterComponent={renderListFooter}
                />
            </WhiteWrapper>
        </View >
    ), []);

    return <SafeAreaInsect
        data={[1]}
        renderItem={renderProfile}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={UserTile}
    />
};

export default Profile;

const styles = StyleSheet.create({
    rootStyle: { width: '100%' },
    inputText: { ...fontStyles.notoSansMedium14 },
    headerTitle: { ...fontStyles.notoSansSemiBold16 },
    container: { backgroundColor: Colors.primaryBack },
    deletTxt: { ...fontStyles.notoSansSemiBold14, color: Colors.error },
    appVersion: { ...fontStyles.notoSansBold10, opacity: 0.25, textAlign: 'center' },
    textCont: { paddingLeft: moderateScale(6), borderWidth: 0, paddingVertical: 0, height: moderateScale(30) },
});
