import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

export default function TabLayout() {
  return (
    <NativeTabs
      backBehavior='history'
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="index">
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
        />
        <Label>Tab One</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="two" disableScrollToTop={false}>
        <Icon
          sf="list.dash"
        />
        <Label>Tab Two</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
