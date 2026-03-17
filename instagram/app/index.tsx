// presentation/screens/ReelsScreen.tsx
import { ReelItemContainer } from '@/components/reel-item';
import { Reel } from '@/entity/reel';
import { useScrollLock } from '@/hooks/useScrollLock';
import { REELS } from '@/utils/data/reels';
import { FlashList, FlashListRef, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { useWindowDimensions, ViewToken } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const viewabilityConfig = { itemVisiblePercentThreshold: 85 };

export default function ReelsScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlashListRef<Reel>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { panResponder, scrollEnabled } = useScrollLock();
  const reelHeight = height - insets.top - insets.bottom;

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const firstFullyVisible = viewableItems.find(
        (v) => v.isViewable && v.index != null
      );

      if (firstFullyVisible?.index != null) {
        setActiveIndex(firstFullyVisible.index);
      }
    },
    []
  );

  const renderItem: ListRenderItem<Reel> = useCallback(
    ({ item, index }) => (
      <ReelItemContainer
        reel={item}
        isActive={index === activeIndex}
      />
    ),
    [activeIndex]
  );

  const keyExtractor = useCallback((item: Reel) => item.id, []);
  const getItemHeight = useCallback(() => reelHeight, [reelHeight]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={['top', 'bottom']}>
        <FlashList
          ref={listRef}
          data={REELS}
          pagingEnabled
          bounces={false}
          decelerationRate="fast"
          overScrollMode="never"
          snapToAlignment="start"
          renderItem={renderItem}
          getItemType={getItemHeight}
          keyExtractor={keyExtractor}
          maxItemsInRecyclePool={10}
          snapToInterval={reelHeight}
          scrollEnabled={scrollEnabled}
          removeClippedSubviews={false}
          disableIntervalMomentum={true}
          showsVerticalScrollIndicator={false}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          {...panResponder.panHandlers}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}