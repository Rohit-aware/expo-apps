import { Client, TablesDB } from "react-native-appwrite";

if (!process.env.EXPO_PUBLIC_APPWRITE_APP_ID) {
  throw new Error("EXPO_PUBLIC_APPWRITE_APP_ID is not set");
}
if (!process.env.EXPO_PUBLIC_APPWRITE_DB_ID) {
  throw new Error("DB_ID is not set");
}
if (!process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) {
  throw new Error("EXPO_PUBLIC_APPWRITE_ENDPOINT is not set");
}
const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_APP_ID,
  platform: "com.modernchat.app",
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    chatrooms: "chatrooms",
    messages: "messages",
  },
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const tablesDB = new TablesDB(client);


export { appwriteConfig, client, tablesDB };
