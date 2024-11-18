import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import LaunchDetail from "@/components/launch-detail-dom";

import * as WebBrowser from "expo-web-browser";

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
      <LaunchDetail
        id={id}
        openExternal={async (url) => {
          WebBrowser.openBrowserAsync(url, {
            presentationStyle: WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
          });
        }}
      />
    </>
  );
}
