import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import Link from "@/components/ui/link";
import CountdownTimer from "@/components/countdown-timer";
import { Ionicons } from "@expo/vector-icons";

import TouchableBounce from "@/components/ui/TouchableBounce";

function formatDateString(dateString: string) {
  const date = new Date(dateString);
  return {
    full: date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }),
    relative: getRelativeTime(date),
  };
}

function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (diff < 0) return "Launched";
  if (days > 0) return `T-${days}d ${hours}h`;
  if (hours > 0) return `T-${hours}h ${minutes}m`;
  return `T-${minutes}m`;
}

function getStatusStyle(status: string) {
  const statusStyles = {
    Go: { bg: "#dcfce7", text: "#166534", border: "#86efac" },
    TBD: { bg: "#fef9c3", text: "#854d0e", border: "#fde047" },
    Hold: { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
    Success: { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
    Failure: { bg: "#fee2e2", text: "#991b1b", border: "#fca5a5" },
    "In Flight": { bg: "#f3e8ff", text: "#6b21a8", border: "#d8b4fe" },
    "Launch Successful": { bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
  };
  return (
    statusStyles[status] || {
      bg: "#f3f4f6",
      text: "#1f2937",
      border: "#e5e7eb",
    }
  );
}

export async function renderUpcomingLaunches() {
  const API_URL =
    "https://lldev.thespacedevs.com/2.2.0/launch/upcoming?limit=10&ordering=net";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch launch data");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No upcoming launches found");
    }

    // Sort and filter launches
    data.results = data.results
      .sort((a, b) => new Date(a.net).getTime() - new Date(b.net).getTime())
      .filter((launch) => new Date(launch.net) > new Date());

    return (
      <>
        <View style={styles.launchList}>
          {data.results.map((launch) => {
            const date = formatDateString(launch.net);
            const statusStyle = getStatusStyle(launch.status.name);

            return (
              <Link href={`/launch/${launch.id}`} key={launch.id} asChild>
                <TouchableBounce style={styles.launchCard}>
                  <View style={styles.cardContent}>
                    {/* Image Section */}
                    <View style={styles.imageContainer}>
                      {launch.image ? (
                        <Image
                          source={{ uri: launch.image }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.placeholderImage}>
                          <Ionicons
                            name="rocket-outline"
                            size={32}
                            color="#9ca3af"
                          />
                        </View>
                      )}
                      <View style={styles.statusBadgeContainer}>
                        <View
                          style={[
                            styles.statusBadge,
                            {
                              backgroundColor: statusStyle.bg,
                              borderColor: statusStyle.border,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              { color: statusStyle.text },
                            ]}
                          >
                            {launch.status.name}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Content Section */}
                    <View style={styles.detailsContainer}>
                      <View style={styles.headerContainer}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.launchName}>{launch.name}</Text>
                          <Text style={styles.providerName}>
                            {launch.launch_service_provider.name}
                          </Text>
                        </View>
                        <View style={styles.timeContainer}>
                          <Text style={styles.relativeTime}>
                            {date.relative}
                          </Text>
                          <Text style={styles.absoluteTime}>{date.time}</Text>
                        </View>
                      </View>

                      <CountdownTimer targetDate={new Date(launch.net)} />

                      <Text style={styles.description} numberOfLines={2}>
                        {launch.mission?.description ||
                          "Mission details pending."}
                      </Text>

                      <View style={styles.footer}>
                        <View style={styles.metadataContainer}>
                          <View style={styles.metadataItem}>
                            <Ionicons
                              name="location"
                              size={16}
                              color="#6b7280"
                            />
                            <Text style={styles.metadataText}>
                              {launch.pad.name}
                            </Text>
                          </View>
                          {launch.mission?.orbit && (
                            <View style={styles.metadataItem}>
                              <Ionicons
                                name="globe"
                                size={16}
                                color="#6b7280"
                              />
                              <Text style={styles.metadataText}>
                                {launch.mission.orbit.name}
                              </Text>
                            </View>
                          )}
                        </View>
                        {launch.webcast_live && (
                          <View style={styles.liveIndicator}>
                            <Ionicons
                              name="videocam"
                              size={16}
                              color="#059669"
                            />
                            <Text style={styles.liveText}>Live</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableBounce>
              </Link>
            );
          })}
        </View>

        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>
            Showing {data.results.length} of {data.count} launches
          </Text>
        </View>
      </>
    );
  } catch (error) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Ionicons
            name="warning"
            size={48}
            color="#dc2626"
            style={styles.errorIcon}
          />
          <Text style={styles.errorTitle}>Error Loading Launches</Text>
          <Text style={styles.errorMessage}>
            {error instanceof Error ? error.message : "An error occurred"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    padding: 16,
    paddingTop: 24,
  },
  launchList: {
    padding: 16,
    gap: 16,
  },
  launchCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f3f4f6",
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "column",
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBadgeContainer: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  detailsContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  launchName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  providerName: {
    fontSize: 14,
    color: "#6b7280",
  },
  timeContainer: {
    alignItems: "flex-end",
  },
  relativeTime: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
  },
  absoluteTime: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    marginTop: 12,
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  metadataContainer: {
    flexDirection: "row",
    gap: 16,
  },
  metadataItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metadataText: {
    fontSize: 14,
    color: "#6b7280",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  liveText: {
    fontSize: 14,
    color: "#059669",
  },
  paginationContainer: {
    padding: 16,
    alignItems: "center",
  },
  paginationText: {
    fontSize: 14,
    color: "#6b7280",
  },
  errorContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  errorContent: {
    backgroundColor: "#fee2e2",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  errorIcon: {
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#991b1b",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: "#dc2626",
  },
});
