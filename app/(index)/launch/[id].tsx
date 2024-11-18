import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import LaunchDetail from "@/components/launch-detail-dom";

export { ErrorBoundary } from "expo-router";

export default function ShowDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Launch",
        }}
      />
      <LaunchDetail id={id} />
    </>
  );
}
