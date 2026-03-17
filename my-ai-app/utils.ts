import Constants from "expo-constants";

export const generateAPIUrl = (relativePath: string) => {
    const path = relativePath.startsWith("/")
        ? relativePath
        : `/${relativePath}`;

    if (process.env.NODE_ENV === "development") {
        const origin =
            Constants.experienceUrl?.replace("exp://", "http://") ||
            Constants.expoConfig?.hostUri?.replace("exp://", "http://");

        if (!origin) {
            return `http://localhost:8081${path}`;
        }

        return origin.split("/--")[0] + path;
    }

    if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
        throw new Error(
            "EXPO_PUBLIC_API_BASE_URL environment variable is not defined"
        );
    }

    return process.env.EXPO_PUBLIC_API_BASE_URL + path;
};