import React from "react";
import { navigationRef } from "../../../../ref";
import { MainStackParamList } from "../../../../route/interface";

type ScreenName = keyof MainStackParamList;

interface NotificationNavigationPayload {
    screen?: ScreenName;
    params?: object;
}

const navigateUsingNotification = (
    payload: NotificationNavigationPayload
) => {
    if (!navigationRef.current?.isReady()) {
        console.log("Navigation not ready");
        return;
    }

    const { screen, params } = payload;

    if (screen) {
        navigationRef.current.navigate(screen, params as never);
    }
};





export { navigateUsingNotification };
