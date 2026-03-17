
import * as ImagePicker from 'expo-image-picker';
import React from 'react';

export const useEditProfileHook = () => {
    const [selectedImage, setSelectedImage] = React.useState<ImagePicker.ImagePickerAsset | undefined>(undefined);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) {
            alert('You did not select any image.');
        } else {
            setSelectedImage(result.assets[0]);
        }
    };


    return {
        pickImageAsync,
        selectedImage
    };
};