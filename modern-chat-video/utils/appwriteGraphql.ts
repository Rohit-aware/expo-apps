// utils/appwriteGraphql.ts

import { client } from "@/utils/appwrite";
import { GraphQLClient } from "graphql-request";
import { Account } from "react-native-appwrite";

export async function getGraphQLClient() {
    const account = new Account(client);
    const jwt = await account.createJWT();

    return new GraphQLClient(
        "https://fra.cloud.appwrite.io/v1/graphql",
        {
            headers: {
                Authorization: `Bearer ${jwt.jwt}`,
            },
        }
    );
}