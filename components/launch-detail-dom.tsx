"use dom";
import { renderLaunchDetail } from "@/functions/render-launch-id";
import React, { useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

import "@/global.css";
import { IS_DOM } from "expo/dom";
import { BodyScrollView } from "./ui/BodyScrollView";

export default function LaunchDetail({ id }: { id: string }) {
  const screen = useMemo(() => renderLaunchDetail({ id }), [id]);

  if (!IS_DOM) {
    return (
      <BodyScrollView>
        <React.Suspense fallback={<LaunchDetailSkeleton />}>
          {screen}
        </React.Suspense>
      </BodyScrollView>
    );
  }

  return (
    <React.Suspense fallback={<LaunchDetailSkeleton />}>
      {screen}
    </React.Suspense>
  );
}

function LaunchDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section Skeleton */}
        <div className="relative h-64 sm:h-96 bg-gray-200 animate-pulse">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-6 w-24 bg-white/20 rounded-full" />
            </div>
            <div className="h-8 w-2/3 bg-white/20 rounded mb-2" />
            <div className="h-4 w-1/3 bg-white/20 rounded" />
          </div>
        </div>

        {/* Countdown Timer Skeleton */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-100">
          <div className="text-center">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
            <div className="h-4 w-56 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="p-6">
          {/* Mission Description Skeleton */}
          <section className="mb-8">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
            </div>
          </section>

          {/* Key Details Grid Skeleton */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Launch Details */}
            <div className="space-y-4">
              <div className="h-6 w-36 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mt-1 mr-3" />
                    <div className="flex-1">
                      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Provider Details */}
            <div className="space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse mt-1 mr-3" />
                    <div className="flex-1">
                      <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Program Information Skeleton */}
          <section className="mb-8">
            <div className="h-6 w-44 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </section>

          {/* Launch Window Skeleton */}
          <section className="mb-8">
            <div className="h-6 w-36 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </section>

          {/* Launch Statistics Skeleton */}
          <section className="mb-8">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </section>

          {/* Related Links Skeleton */}
          <section className="border-t border-gray-100 pt-8">
            <div className="flex flex-wrap gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="inline-flex items-center">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse mr-1" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
