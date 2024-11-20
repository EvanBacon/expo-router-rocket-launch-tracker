"use server";

import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import * as AColors from "@bacons/apple-colors";

import Link from "@/components/ui/link";
import { Stack } from "expo-router";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import CountdownTimer from "@/components/countdown-timer";

function formatCountdown(launchDate: Date) {
  const now = new Date();
  const diff = launchDate.getTime() - now.getTime();

  if (diff < 0) return "Launch has occurred";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `T-${days}d ${hours}h ${minutes}m`;
}

function getStatusColor(status: string) {
  const statusColors = {
    Go: { bg: "#dcfce7", text: "#166534", border: "#bbf7d0" },
    TBD: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
    Hold: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
    Success: { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" },
    Failure: { bg: "#fee2e2", text: "#991b1b", border: "#fecaca" },
    "In Flight": { bg: "#f3e8ff", text: "#6b21a8", border: "#e9d5ff" },
    "Launch Successful": { bg: "#dbeafe", text: "#1e40af", border: "#bfdbfe" },
  };
  return (
    statusColors[status] || {
      bg: "#f3f4f6",
      text: "#1f2937",
      border: "#e5e7eb",
    }
  );
}

export async function renderLaunchDetail({ id }: { id: string }) {
  const API_URL = `https://lldev.thespacedevs.com/2.2.0/launch/${id}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch launch data");
    const launch = await response.json();
    const launchDate = new Date(launch.net);
    const statusColors = getStatusColor(launch.status.name);

    return (
      <ScrollView style={styles.container}>
        <Stack.Screen
          options={{
            title: launch.rocket.configuration.full_name ?? launch.name,
            headerBackTitle: "Launches",
          }}
        />

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            transition={200}
            source={
              launch.image
                ? { uri: launch.image }
                : require("../assets/default-launch.jpg")
            }
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusColors.bg },
                ]}
              >
                <Text style={[styles.statusText, { color: statusColors.text }]}>
                  {launch.status.name}
                </Text>
              </View>
              {launch.webcast_live && (
                <View style={styles.liveBadge}>
                  <Text style={styles.liveText}>Live</Text>
                </View>
              )}
            </View>
            <Text style={styles.heroTitle}>{launch.name}</Text>
            <Text style={styles.heroSubtitle}>
              {launch.launch_service_provider.name}
            </Text>
          </View>
        </View>

        {/* Countdown Timer */}
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownLabel}>TIME TO LAUNCH</Text>

          <CountdownTimer targetDate={launchDate} />
          <Text style={styles.countdownDate}>
            {launchDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {" at "}
            {launchDate.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              timeZoneName: "short",
            })}
          </Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Mission Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mission Overview</Text>
            <Text style={styles.missionDescription}>
              {launch.mission?.description ||
                "Mission details are not yet available."}
            </Text>
          </View>

          {/* Launch Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Launch Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons
                  name="rocket"
                  size={24}
                  color="#9ca3af"
                />
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Vehicle</Text>
                  <Text style={styles.detailValue}>
                    {launch.rocket.configuration.full_name}
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <Ionicons name="location" size={24} color="#9ca3af" />
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Launch Site</Text>
                  <Text style={styles.detailValue}>{launch.pad.name}</Text>
                  <Text style={styles.detailSubvalue}>
                    {launch.pad.location.name}
                  </Text>
                </View>
              </View>

              {launch.mission?.orbit && (
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons
                    name="orbit"
                    size={24}
                    color="#9ca3af"
                  />
                  <View style={styles.detailText}>
                    <Text style={styles.detailLabel}>Target Orbit</Text>
                    <Text style={styles.detailValue}>
                      {launch.mission.orbit.name}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Launch Provider */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Launch Provider</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <MaterialIcons name="business" size={24} color="#9ca3af" />
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Provider</Text>
                  <Text style={styles.detailValue}>
                    {launch.launch_service_provider.name}
                  </Text>
                </View>
              </View>

              <View style={styles.detailItem}>
                <FontAwesome5 name="clipboard-list" size={24} color="#9ca3af" />
                <View style={styles.detailText}>
                  <Text style={styles.detailLabel}>Mission Type</Text>
                  <Text style={styles.detailValue}>
                    {launch.mission?.type || "Unknown"}
                  </Text>
                </View>
              </View>

              {launch.probability !== null && (
                <View style={styles.detailItem}>
                  <MaterialIcons name="assessment" size={24} color="#9ca3af" />
                  <View style={styles.detailText}>
                    <Text style={styles.detailLabel}>Launch Probability</Text>
                    <Text style={styles.detailValue}>
                      {launch.probability}%
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Launch Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Launch Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  #{launch.pad_launch_attempt_count}
                </Text>
                <Text style={styles.statLabel}>Pad Launch</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  #{launch.location_launch_attempt_count}
                </Text>
                <Text style={styles.statLabel}>Location Launch</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  #{launch.agency_launch_attempt_count}
                </Text>
                <Text style={styles.statLabel}>Agency Launch</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>
                  #{launch.pad_launch_attempt_count_year}
                </Text>
                <Text style={styles.statLabel}>This Year</Text>
              </View>
            </View>
          </View>

          {/* Related Links */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Related Links</Text>
            <View style={styles.linksContainer}>
              {launch.pad.wiki_url && (
                <Link
                  style={styles.link}
                  href={launch.pad.wiki_url}
                  target="_blank"
                >
                  <View style={styles.link}>
                    <MaterialIcons name="launch" size={20} color="#2563eb" />
                    <Text style={styles.linkText}>Launch Site Wiki</Text>
                  </View>
                </Link>
              )}
              {launch.launch_service_provider.info_url && (
                <Link
                  style={styles.link}
                  target="_blank"
                  href={launch.launch_service_provider.info_url}
                >
                  <View style={styles.link}>
                    <MaterialIcons name="info" size={20} color="#2563eb" />
                    <Text style={styles.linkText}>Provider Info</Text>
                  </View>
                </Link>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } catch (error) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color="#dc2626" />
        <Text style={styles.errorTitle}>Error Loading Launch Details</Text>
        <Text style={styles.errorMessage}>
          {error instanceof Error ? error.message : "An error occurred"}
        </Text>
        <Link href="/" asChild>
          <Pressable style={styles.errorButton}>
            <Text style={styles.errorButtonText}>Back to Launches</Text>
          </Pressable>
        </Link>
      </View>
    );
  }
}

// ... (previous code remains the same until styles)

const styles = {
  container: {
    flex: 1,
    backgroundColor: AColors.systemGroupedBackground,
  },
  heroContainer: {
    height: 300,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  statusContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  liveBadge: {
    backgroundColor: "#fee2e2",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  liveText: {
    color: "#991b1b",
    fontSize: 14,
    fontWeight: "500",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#e5e7eb",
    marginTop: 4,
  },
  countdownContainer: {
    padding: 24,
    backgroundColor: AColors.systemGroupedBackground,
    alignItems: "center",
  },
  countdownLabel: {
    fontSize: 12,
    color: AColors.secondaryLabel,
    marginBottom: 4,
  },
  countdownTimer: {
    fontSize: 28,
    fontWeight: "bold",
    color: AColors.systemBlue,
  },
  countdownDate: {
    fontSize: 14,
    color: AColors.secondaryLabel,
    marginTop: 8,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: AColors.label,
    marginBottom: 16,
  },
  missionDescription: {
    fontSize: 16,
    color: AColors.secondaryLabel,
    lineHeight: 24,
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: AColors.label,
  },
  detailValue: {
    fontSize: 16,
    color: AColors.secondaryLabel,
  },
  detailSubvalue: {
    fontSize: 14,
    color: AColors.tertiaryLabel,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statCard: {
    flex: 1,
    minWidth: "48%",
    backgroundColor: AColors.secondarySystemGroupedBackground,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: AColors.systemBlue,
  },
  statLabel: {
    fontSize: 14,
    color: AColors.secondaryLabel,
    marginTop: 4,
  },
  linksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  linkText: {
    fontSize: 16,
    color: AColors.systemBlue,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#991b1b",
    marginVertical: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: AColors.systemRed,
    marginBottom: 16,
    textAlign: "center",
  },
  errorButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  errorButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  // Additional styles for launch window section
  launchWindowGrid: {
    flexDirection: "row",
    gap: 8,
  },
  windowCard: {
    flex: 1,
    backgroundColor: AColors.systemBackground,
    padding: 16,
    borderRadius: 8,
  },
  windowLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  windowValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },
  // Styles for program information
  programCard: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  programDescription: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
  },
  programLink: {
    flexDirection: "row",
    alignItems: "center",
  },
  programLinkText: {
    fontSize: 14,
    color: "#2563eb",
    marginRight: 4,
  },
  // Styles for updates section
  updatesContainer: {
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 8,
  },
  updateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#6b7280",
  },
  updateStatus: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  holdReason: {
    fontSize: 14,
    color: "#b45309",
    marginBottom: 4,
  },
  failReason: {
    fontSize: 14,
    color: "#dc2626",
  },
  // Styles for webcast section
  webcastContainer: {
    backgroundColor: "#f9fafb",
    padding: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
    marginRight: 8,
  },
  liveIndicatorText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#22c55e",
  },
  webcastMessage: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 16,
    textAlign: "center",
  },
  webcastButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  webcastButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 8,
  },
} as const;
