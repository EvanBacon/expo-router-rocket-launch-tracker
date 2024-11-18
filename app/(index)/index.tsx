/// <reference types="react/canary" />
import { ScrollView, View } from "react-native";

import React from "react";
import { renderSearchContents } from "@/functions/render-search";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";
import * as AC from "@bacons/apple-colors";
import { SearchPlaceholder } from "@/components/SearchPlaceholder";

const POSTER_WIDTH = 140;
const POSTER_HEIGHT = 210;

export default function HomeScreen() {
  const text = useHeaderSearch({
    placeholder: "Shows, Movies, and More",
  });

  if (!text || text.length < 2) {
    return <SearchPlaceholder />;
  }

  return <SearchPage text={text} />;
}

function SearchPage({ text }: { text: string }) {
  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}
    >
      <React.Suspense fallback={<Loading />}>
        {renderSearchContents(text)}
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
