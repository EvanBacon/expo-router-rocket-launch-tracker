import { renderLaunchDetail } from "@/functions/render-launch-id";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

import "@/global.css";
import { IS_DOM } from "expo/dom";
import { BodyScrollView } from "./ui/BodyScrollView";
import LaunchDetailSkeleton from "./launch-detail-skeleton";

export default function LaunchDetail({
  id,
  openExternal,
}: {
  id: string;
  openExternal: (url: string) => void;
}) {
  // Open external URLs with in-app browser.
  //   useEffect(() => {
  //     if (IS_DOM) {
  //       function handleClick(event) {
  //         var target = event.target;
  //         while (target && target.tagName !== "A") {
  //           target = target.parentNode;
  //         }
  //         if (target && target.tagName === "A") {
  //           event.preventDefault();
  //           if (target.href.startsWith("http")) {
  //             openExternal(target.href);
  //           }
  //           return false;
  //         }
  //         return true;
  //       }
  //       document.addEventListener("click", handleClick, false);
  //     }
  //   }, []);

  const screen = useMemo(() => renderLaunchDetail({ id }), [id]);

  return (
    <BodyScrollView>
      <React.Suspense fallback={<LaunchDetailSkeleton />}>
        {screen}
      </React.Suspense>
    </BodyScrollView>
  );
}
