import React from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../utils/registerForPushNotificationAsync";
import { navigateUsingNotification } from "../src/screens/bottom-tab-screens/Home-screen/utils/navigation-util";

Notifications.setNotificationHandler({
    handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
        shouldShowBanner: true,   // 👈 replaces shouldShowAlert
        shouldShowList: true,     // 👈 replaces shouldShowAlert
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});


interface NotificationContextType {
    expoPushToken: string | null;
    notification: Notifications.Notification | null;
    error: Error | null;
}

const NotificationContext = React.createContext<NotificationContextType | undefined>(
    undefined
);

export const useNotification = () => {
    const context = React.useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within NotificationProvider");
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [expoPushToken, setExpoPushToken] = React.useState<string | null>(null);
    const [notification, setNotification] =
        React.useState<Notifications.Notification | null>(null);
    const [error, setError] = React.useState<Error | null>(null);

    const notificationListener = React.useRef<Notifications.EventSubscription | undefined>(undefined);
    const responseListener = React.useRef<Notifications.EventSubscription | undefined>(undefined);

    const contextValue = React.useMemo(
        () => ({ expoPushToken, notification, error }),
        [expoPushToken, notification, error]
    );

    React.useEffect(() => {
        registerForPushNotificationsAsync()
            .then(setExpoPushToken)
            .catch(setError);

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                console.log("🔔 Notification received", notification);
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener((response) => {
                const data = response.notification.request.content.data;
                console.log(
                    "🔔 Notification response",
                    data
                );
                navigateUsingNotification(data);
            });

        return () => {
            notificationListener.current?.remove();
            responseListener.current?.remove();
        };
    }, []);

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
};
