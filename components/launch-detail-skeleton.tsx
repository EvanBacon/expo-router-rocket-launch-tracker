import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import * as AColors from "@bacons/apple-colors";
import CountdownTimer from "./countdown-timer";

export default function LaunchDetailSkeleton() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroContainer}>
        <View style={styles.heroImageSkeleton} />
        <View style={styles.heroOverlay}>
          <View style={styles.statusContainer}>
            <View style={styles.statusBadgeSkeleton} />
            <View style={styles.liveBadgeSkeleton} />
          </View>
          <View style={styles.heroTitleSkeleton} />
          <View style={styles.heroSubtitleSkeleton} />
        </View>
      </View>

      <View style={styles.countdownContainer}>
        <View style={styles.countdownLabelSkeleton} />
        <CountdownTimer targetDate={new Date()} />

        <View style={styles.countdownDateSkeleton} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.missionDescriptionSkeleton} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={styles.iconSkeleton} />
              <View style={styles.detailText}>
                <View style={styles.detailLabelSkeleton} />
                <View style={styles.detailValueSkeleton} />
              </View>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.iconSkeleton} />
              <View style={styles.detailText}>
                <View style={styles.detailLabelSkeleton} />
                <View style={styles.detailValueSkeleton} />
                <View style={styles.detailSubvalueSkeleton} />
              </View>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.iconSkeleton} />
              <View style={styles.detailText}>
                <View style={styles.detailLabelSkeleton} />
                <View style={styles.detailValueSkeleton} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={styles.iconSkeleton} />
              <View style={styles.detailText}>
                <View style={styles.detailLabelSkeleton} />
                <View style={styles.detailValueSkeleton} />
              </View>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.iconSkeleton} />
              <View style={styles.detailText}>
                <View style={styles.detailLabelSkeleton} />
                <View style={styles.detailValueSkeleton} />
              </View>
            </View>
            <View style={styles.detailItem}>
              <View style={styles.iconSkeleton} />
              <View style={styles.detailText}>
                <View style={styles.detailLabelSkeleton} />
                <View style={styles.detailValueSkeleton} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.statsGrid}>
            <View style={styles.statCardSkeleton} />
            <View style={styles.statCardSkeleton} />
            <View style={styles.statCardSkeleton} />
            <View style={styles.statCardSkeleton} />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleSkeleton} />
          <View style={styles.linksContainer}>
            <View style={styles.linkSkeleton} />
            <View style={styles.linkSkeleton} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AColors.systemGroupedBackground,
  },
  heroContainer: {
    height: 300,
    position: "relative",
  },
  heroImageSkeleton: {
    width: "100%",
    height: "100%",
    backgroundColor: AColors.secondarySystemGroupedBackground,
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: AColors.systemGray3,
  },
  statusContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  statusBadgeSkeleton: {
    width: 80,
    height: 24,
    backgroundColor: AColors.systemGray4,
    borderRadius: 16,
    marginRight: 8,
  },
  liveBadgeSkeleton: {
    width: 40,
    height: 24,
    backgroundColor: AColors.systemGray4,
    borderRadius: 16,
  },
  heroTitleSkeleton: {
    width: "60%",
    height: 24,
    backgroundColor: AColors.systemGray4,
    marginBottom: 4,
  },
  heroSubtitleSkeleton: {
    width: "40%",
    height: 16,
    backgroundColor: AColors.systemGray4,
  },
  countdownContainer: {
    padding: 24,
    backgroundColor: AColors.systemGroupedBackground,
    alignItems: "center",
  },
  countdownLabelSkeleton: {
    width: 100,
    height: 12,
    backgroundColor: AColors.systemGray4,
    marginBottom: 4,
  },
  countdownTimerSkeleton: {
    width: 150,
    height: 28,
    backgroundColor: AColors.systemGray4,
    marginBottom: 8,
  },
  countdownDateSkeleton: {
    width: 200,
    height: 14,
    backgroundColor: AColors.systemGray4,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitleSkeleton: {
    width: "50%",
    height: 20,
    backgroundColor: AColors.systemGray4,
    marginBottom: 16,
  },
  missionDescriptionSkeleton: {
    width: "100%",
    height: 16,
    backgroundColor: AColors.systemGray4,
    marginBottom: 8,
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconSkeleton: {
    width: 24,
    height: 24,
    backgroundColor: AColors.systemGray4,
  },
  detailText: {
    flex: 1,
  },
  detailLabelSkeleton: {
    width: "50%",
    height: 16,
    backgroundColor: AColors.systemGray4,
    marginBottom: 4,
  },
  detailValueSkeleton: {
    width: "70%",
    height: 16,
    backgroundColor: AColors.systemGray4,
    marginBottom: 4,
  },
  detailSubvalueSkeleton: {
    width: "40%",
    height: 14,
    backgroundColor: AColors.systemGray4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statCardSkeleton: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: AColors.systemGray4,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  linksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  linkSkeleton: {
    width: "45%",
    height: 24,
    backgroundColor: AColors.systemGray4,
  },
});
