import * as FileSystem from 'expo-file-system';

export const cacheVideo = async (uri: string) => {
    const file = FileSystem.cacheDirectory + uri.split('/').pop();

    const info = await FileSystem.getInfoAsync(file);
    if (info.exists) return file;

    await FileSystem.downloadAsync(uri, file);
    return file;
};