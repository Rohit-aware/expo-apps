import React, { memo } from 'react';
import TakeSpace from '../take-space';
import InputField from '../input-field';
import { commonStyles } from '../../../styles';
import { navigationHook } from '../../../hooks';
import fontStyles from '../../../styles/font-styles';
import { Colors, moderateScale } from '../../../constants';
import { BackArrow, SearchIcon } from '../../../assets/icons';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export type HeaderVariant = 'default' | 'search' | 'custom';

type HeaderProps = React.PropsWithChildren<{
    title?: string;
    subTitle?: string;
    search?: string;
    variant?: HeaderVariant;
    showArrow?: boolean;
    rootStyle?: ViewStyle | ViewStyle[];
    onChangeText?: (value: string) => void;
}>;

const Header = ({
    title,
    subTitle,
    search,
    variant = 'default',
    showArrow = true,
    rootStyle,
    onChangeText,
    children,
}: HeaderProps) => {
    const { navigateBack } = navigationHook();

    const renderCenterContent = React.useCallback(
        () => {
            switch (variant) {
                case 'custom':
                    return children ?? null;

                case 'search':
                    return (
                        <InputField
                            value={search}
                            Icon={SearchIcon}
                            placeholder="Search here"
                            cursorColor={Colors.white}
                            onChangeText={onChangeText}
                            rootStyle={styles.searchRoot}
                            placeholderTextColor={Colors.white}
                            inputTxtStyle={styles.searchText}
                            textContinerStyle={styles.searchContainer}
                        />
                    );

                case 'default':
                default:
                    return (
                        <View style={[styles.titleSubTitle]}>
                            {!!title && <Text style={styles.title}>{title}</Text>}
                            {!!subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
                        </View>
                    );
            }
        }, [variant]);

    return (
        <View style={[styles.container, rootStyle]}>
            <TakeSpace space={30} />
            <Pressable style={styles.row} onPress={navigateBack} >
                {showArrow && <BackArrow />}
                {renderCenterContent()}
            </Pressable>
            <TakeSpace />
        </View>
    );
};

export default memo(Header);

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.accent,
        paddingHorizontal: moderateScale(10),
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
    },
    row: {
        ...commonStyles.RowJFSAC,
    },
    titleSubTitle: {
        paddingLeft: moderateScale(8),
        ...commonStyles.columnJFS,
    },
    title: {
        ...fontStyles.notoSansSemiBold14,
        color: Colors.white,
    },

    subTitle: {
        ...fontStyles.notoSansMedium12,
        color: Colors.textWhite75,
    },
    searchRoot: {
        width: '85%',
    },
    searchContainer: {
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(60),
        backgroundColor: Colors.white10,
        borderColor: Colors.ligthWhiteBorder,
    },
    searchText: {
        color: Colors.white,
    },
});
