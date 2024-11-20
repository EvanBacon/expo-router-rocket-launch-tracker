import { renderLaunchDetail } from "@/functions/render-launch-id";
import React, { useMemo } from "react";

import "@/global.css";
import { BodyScrollView } from "./ui/BodyScrollView";
import LaunchDetailSkeleton from "./launch-detail-skeleton";

export default function LaunchDetail({ id }: { id: string }) {
  const screen = useMemo(() => renderLaunchDetail({ id }), [id]);

  return (
    <BodyScrollView>
      <React.Suspense fallback={<LaunchDetailSkeleton />}>
        {screen}
      </React.Suspense>
    </BodyScrollView>
  );
}
