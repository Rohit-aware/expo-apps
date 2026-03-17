import * as Notifications from 'expo-notifications';
import { navigateUsingNotification } from "../utils/navigation-util";

export const useColdStartNavigation = () => {
    const checkInitialNotification = async () => {
        const response = Notifications.getLastNotificationResponse();
        if (response) {
            const data = response.notification.request.content.data;
            navigateUsingNotification(data);
        }
    };
    return {
        checkInitialNotification,
    }

}
