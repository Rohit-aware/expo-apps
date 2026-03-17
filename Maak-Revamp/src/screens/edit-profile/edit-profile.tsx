import React from 'react';
import { Image } from 'expo-image';
import { Header, InputField, TakeSpace } from '../../components';
import { commonStyles } from '../../styles';
import fontStyles from '../../styles/font-styles';
import { Colors, moderateScale } from '../../constants';
import { useEditProfileHook } from './edit-profile.hook';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ContactSvg } from '../../assets/icons';

const Editprofile = () => {
    const editprofileHook = useEditProfileHook();

    const {
        selectedImage,
        pickImageAsync,
    } = editprofileHook;

    return (
        <View style={commonStyles._flexOneBg(Colors.white)}>
            <Header title='Edit Profile' />
            <Pressable style={styles.whiteCont} onPress={pickImageAsync}>
                {selectedImage?.uri ?
                    <Image
                        source={{ uri: selectedImage.uri }}
                        style={styles.imgStyle}
                        contentFit='cover'
                    />
                    :
                    <Text style={fontStyles.notoSansBold20}>R</Text>
                }
            </Pressable>
            <TakeSpace />
            <InputField
                label='Name'
                placeholder='Enter Your name'
                Icon={ContactSvg}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    whiteCont: {
        alignSelf: 'center',
        borderRadius: '50%',
        width: moderateScale(78),
        height: moderateScale(78),
        ...commonStyles.centerJCAC,
        backgroundColor: Colors.shadedWhite,
        marginVertical: moderateScale(20)
    },
    imgStyle: {
        width: moderateScale(78),
        height: moderateScale(78),
        borderRadius: moderateScale(39),
    }
})

export default Editprofile;
