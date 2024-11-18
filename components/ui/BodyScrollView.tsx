"use client";

import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useBottomTabOverflow } from "./TabBarBackground";

export const BodyScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
  const paddingBottom = useBottomTabOverflow();
  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{ bottom: paddingBottom }}
      scrollIndicatorInsets={{ bottom: paddingBottom }}
      {...props}
      ref={ref}
    />
  );
});
