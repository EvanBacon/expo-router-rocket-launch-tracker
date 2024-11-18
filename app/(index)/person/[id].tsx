import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { renderPersonDetails } from "@/functions/render-person-details";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import * as AC from "@bacons/apple-colors";

export { ErrorBoundary } from "expo-router";

export default function PersonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const screen = useMemo(() => renderPersonDetails(id), [id]);

  return (
    <BodyScrollView>
      <Stack.Screen
        options={{
          title: "Person",
        }}
      />
      <React.Suspense fallback={<PersonDetailsSkeleton />}>
        {screen}
      </React.Suspense>
    </BodyScrollView>
  );
}

function PersonDetailsSkeleton() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 300,
          backgroundColor: AC.systemGray6,
          justifyContent: "flex-end",
          padding: 16,
        }}
      >
        <View
          style={{
            height: 32,
            width: 200,
            backgroundColor: AC.systemGray5,
            borderRadius: 6,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            height: 18,
            width: 150,
            backgroundColor: AC.systemGray5,
            borderRadius: 4,
          }}
        />
      </View>

      <View style={{ padding: 16 }}>
        <View
          style={{
            height: 22,
            width: 100,
            backgroundColor: AC.systemGray5,
            borderRadius: 4,
            marginBottom: 12,
          }}
        />

        <View
          style={{
            backgroundColor: AC.secondarySystemGroupedBackground,
            borderRadius: 10,
            marginBottom: 16,
            height: 100,
          }}
        />

        <View
          style={{
            height: 200,
            backgroundColor: AC.systemGray5,
            borderRadius: 8,
          }}
        />
      </View>

      <View style={{ flex: 1, marginTop: 16 }}>
        <View style={{ flexDirection: "row", paddingHorizontal: 16, gap: 16 }}>
          {[120, 100, 110].map((width, i) => (
            <View
              key={i}
              style={{
                width,
                height: 16,
                backgroundColor: AC.systemGray5,
                borderRadius: 4,
              }}
            />
          ))}
        </View>

        <View
          style={{
            padding: 16,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={{
                width: "48%",
                height: 250,
                backgroundColor: AC.systemGray5,
                borderRadius: 12,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
