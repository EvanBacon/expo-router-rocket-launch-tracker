/// <reference types="react/canary" />
import "@/global.css";

import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { renderUpcomingLaunches } from "@/functions/render-launches";
import * as AC from "@bacons/apple-colors";
import { useCallback, useState } from "react";
import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { IndexLoading } from "@/components/index-loading";

const POSTER_WIDTH = 140;
const POSTER_HEIGHT = 210;

export default function HomeScreen(_: { dom?: import("expo/dom").DOMProps }) {
  const [refreshing, setRefreshing] = useState(false);
  const [renderKey, setRenderKey] = useState("123");
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Re-invoke the renderUpcomingLaunches function
    setRenderKey(Math.random().toString());
    setRefreshing(false);
  }, []);

  return (
    <BodyScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <React.Suspense key={renderKey} fallback={<IndexLoading />}>
        {renderUpcomingLaunches()}
      </React.Suspense>
    </BodyScrollView>
  );
}

function Loading() {
  return (
    <View style={{ gap: 24 }}>
      <SkeletonSection />
      <SkeletonSection />
      <SkeletonSection />
    </View>
  );
}

const SkeletonItem = () => (
  <View style={{ marginHorizontal: 4 }}>
    <View
      style={{
        width: POSTER_WIDTH,
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: POSTER_WIDTH,
          height: POSTER_HEIGHT,
          borderRadius: 12,
          backgroundColor: AC.systemGray5,
        }}
      />
      <View style={{ padding: 8, gap: 4 }}>
        <View
          style={{
            height: 14,
            width: "80%",
            backgroundColor: AC.systemGray5,
            borderRadius: 4,
          }}
        />
        <View
          style={{
            height: 12,
            width: "30%",
            backgroundColor: AC.systemGray5,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  </View>
);

const SkeletonSection = () => (
  <View>
    <View
      style={{
        width: 100,
        height: 20,
        backgroundColor: AC.systemGray5,
        borderRadius: 4,
        marginBottom: 12,
        marginLeft: 16,
      }}
    />
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
      {[...Array(4)].map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </ScrollView>
  </View>
);
