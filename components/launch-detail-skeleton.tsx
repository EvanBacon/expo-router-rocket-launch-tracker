import { View, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";

import * as AC from "@bacons/apple-colors";

function LaunchDetailSkeleton() {
  // Create animation value for pulse effect
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Create pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  // Interpolate animation value for opacity
  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  // Reusable skeleton line component
  const SkeletonLine = ({ width, height = 16, style = {} }) => (
    <Animated.View
      style={[
        styles.skeletonBase,
        { width, height, opacity: opacityAnim },
        style,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Hero Section Skeleton */}
        <View style={styles.heroContainer}>
          <Animated.View
            style={[styles.heroBackground, { opacity: opacityAnim }]}
          />
          <View style={styles.heroContent}>
            <View style={styles.statusContainer}>
              <SkeletonLine width={100} height={24} style={styles.badge} />
            </View>
            <SkeletonLine width="80%" height={32} style={styles.mb8} />
            <SkeletonLine width="40%" height={16} />
          </View>
        </View>

        {/* Countdown Timer Skeleton */}
        <View style={styles.countdownContainer}>
          <SkeletonLine width={120} height={16} style={styles.mb8} />
          <SkeletonLine width={180} height={32} style={styles.mb8} />
          <SkeletonLine width={220} height={16} />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Mission Description */}
          <View style={styles.section}>
            <SkeletonLine width={160} height={24} style={styles.mb16} />
            <View style={styles.descriptionLines}>
              <SkeletonLine width="100%" style={styles.mb8} />
              <SkeletonLine width="90%" style={styles.mb8} />
              <SkeletonLine width="80%" />
            </View>
          </View>

          {/* Key Details Grid */}
          <View style={styles.detailsGrid}>
            {/* Launch Details */}
            <View style={styles.detailSection}>
              <SkeletonLine width={140} height={24} style={styles.mb16} />
              {[...Array(3)].map((_, i) => (
                <View key={`launch-${i}`} style={styles.detailRow}>
                  <SkeletonLine width={20} height={20} style={styles.icon} />
                  <View style={styles.flex1}>
                    <SkeletonLine width={100} height={20} style={styles.mb8} />
                    <SkeletonLine width={180} height={16} />
                  </View>
                </View>
              ))}
            </View>

            {/* Provider Details */}
            <View style={styles.detailSection}>
              <SkeletonLine width={160} height={24} style={styles.mb16} />
              {[...Array(3)].map((_, i) => (
                <View key={`provider-${i}`} style={styles.detailRow}>
                  <SkeletonLine width={20} height={20} style={styles.icon} />
                  <View style={styles.flex1}>
                    <SkeletonLine width={120} height={20} style={styles.mb8} />
                    <SkeletonLine width={140} height={16} />
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Statistics Grid */}
          <View style={styles.section}>
            <SkeletonLine width={160} height={24} style={styles.mb16} />
            <View style={styles.statsGrid}>
              {[...Array(4)].map((_, i) => (
                <View key={`stat-${i}`} style={styles.statCard}>
                  <SkeletonLine width={60} height={32} style={styles.mb8} />
                  <SkeletonLine width={80} height={16} />
                </View>
              ))}
            </View>
          </View>

          {/* Related Links */}
          <View style={styles.linksSection}>
            {[...Array(3)].map((_, i) => (
              <View key={`link-${i}`} style={styles.linkRow}>
                <SkeletonLine width={16} height={16} style={styles.mr8} />
                <SkeletonLine width={100} height={16} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AC.secondarySystemBackground,
    padding: 16,
  },
  card: {
    backgroundColor: AC.secondarySystemGroupedBackground,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  skeletonBase: {
    backgroundColor: AC.systemGray3,
    borderRadius: 4,
  },
  heroContainer: {
    height: 300,
    position: "relative",
  },
  heroBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: AC.systemGray3,
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  statusContainer: {
    marginBottom: 16,
  },
  badge: {
    borderRadius: 16,
  },
  countdownContainer: {
    padding: 24,

    alignItems: "center",
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  descriptionLines: {
    gap: 8,
  },
  detailsGrid: {
    marginBottom: 32,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statCard: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: AC.systemGray5,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  linksSection: {
    borderTopWidth: 1,
    borderTopColor: AC.systemGray5,
    paddingTop: 24,
    gap: 16,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  mb8: {
    marginBottom: 8,
  },
  mb16: {
    marginBottom: 16,
  },
  mr8: {
    marginRight: 8,
  },
});

export default LaunchDetailSkeleton;
