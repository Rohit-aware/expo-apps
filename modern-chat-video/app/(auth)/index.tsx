import * as React from "react";
import { Image, View } from "react-native";

import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import {
    isClerkAPIResponseError,
    useSignIn,
    useSSO,
} from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { SafeAreaView } from "react-native-safe-area-context";

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

export default function Index() {
    const { startSSOFlow } = useSSO();
    const { signIn, setActive } = useSignIn();
    const [errors, setErrors] = React.useState<ClerkAPIError[]>([]);

    const handleSignInWithGoogle = React.useCallback(async () => {
        try {
            // Start the authentication process by calling `startSSOFlow()`
            const result = await startSSOFlow({
                strategy: "oauth_google",
                redirectUrl: AuthSession.makeRedirectUri()
            });

            if (result.createdSessionId) {
                await result.setActive!({
                    session: result.createdSessionId,
                });
            } else {
                // If there is no `createdSessionId`,
                // there are missing requirements, such as MFA
                // Use the `signIn` or `signUp` returned from `startSSOFlow`
                // to handle next steps
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            if (isClerkAPIResponseError(err)) setErrors(err.errors);
            console.log(JSON.stringify(err, null, 2));
        }
    }, [startSSOFlow]);

    const signInWithPasskey = async () => {
        // 'discoverable' lets the user choose a passkey
        // without auto-filling any of the options
        try {
            const signInAttempt = await signIn?.authenticateWithPasskey({
                flow: "discoverable",
            });

            if (signInAttempt?.status === "complete") {
                if (setActive !== undefined) {
                    await setActive({ session: signInAttempt.createdSessionId });
                }
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.log(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error("Error:", JSON.stringify(err, null, 2));
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* spacer */}
            <View style={{ flex: 0.1 }} />

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 16,
                }}
            >
                <View style={{ gap: 20, alignItems: "center" }}>
                    <Image
                        source={require("@/assets/images/logo.png")}
                        style={{ width: 100, height: 100 }}
                    />
                    <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                        Modern Chat App
                    </Text>
                    <Text>Sign in to continue</Text>
                    {errors.map((error) => (
                        <Text key={error.code}>{error.code}</Text>
                    ))}
                </View>

                {/* spacer */}
                <View style={{ flex: 1 }} />
                <Button
                    onPress={signInWithPasskey}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        marginBottom: 20,
                        backgroundColor: "black",
                        borderColor: "white",
                        borderWidth: 1,
                    }}
                >
                    <Text style={{ color: "white", fontWeight: "500" }}>
                        Sign in with Passkey
                    </Text>
                </Button>
                <Button
                    onPress={handleSignInWithGoogle}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        marginBottom: 30,
                    }}
                >
                    <Image
                        source={require("@/assets/images/google-icon.png")}
                        style={{ width: 20, height: 20 }}
                    />
                    <Text style={{ color: "black", fontWeight: "500" }}>
                        Sign in with Google
                    </Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}