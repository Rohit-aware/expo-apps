import React from 'react';
import { screens } from '../screens';
import { BottomTabParamList } from './interface';
import BottomComp from './components/bottom-comp';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

type RenderTabProps = (
    name: keyof BottomTabParamList,
    getComponent: () => React.ComponentType<any>,
    condition: boolean
) => React.ReactNode;

const Tabs = createBottomTabNavigator<BottomTabParamList>();
const Empty: React.FC = () => null;

const tabBar = (props: BottomTabBarProps) => <BottomComp {...props} />
const BottomTab = () => {

    const renderTab: RenderTabProps = ((name, getComponent, condition) => {
        return condition ? (
            <Tabs.Screen name={name} getComponent={getComponent} />
        ) : (
            <Tabs.Screen
                name={`Empty_${name}` as keyof BottomTabParamList}
                component={Empty}
                listeners={() => ({
                    tabPress: (e) => {
                        e.preventDefault();
                    },
                })}
            />
        );
    });

    return (
        <Tabs.Navigator
            tabBar={tabBar}
            screenOptions={{ headerShown: false, lazy: true }}
        >
            {renderTab("Home", screens['Home'], true)}
            {renderTab("Offers", screens['Offers'], true)}
            {renderTab("ScanQr", screens['ScanQr'], true)}
            {renderTab("Payments", screens['Payments'], true)}
            {renderTab("Profile", screens['Profile'], true)}
        </Tabs.Navigator>
    );
};

export default BottomTab;