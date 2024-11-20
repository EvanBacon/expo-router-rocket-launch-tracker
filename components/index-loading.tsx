import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CountdownTimer from "./countdown-timer";

import * as AC from "@bacons/apple-colors";

export function IndexLoading() {
  return (
    <>
      <View style={styles.launchList}>
        {new Array(5).fill(0).map((_, index) => (
          <View key={index} style={styles.launchCard}>
            <View style={styles.cardContent}>
              {/* Image Section */}
              <View style={styles.imageContainer}>
                <View style={styles.placeholderImage}>
                  <Ionicons
                    name="rocket-outline"
                    size={32}
                    color={AC.systemGray2}
                  />
                </View>
                <View style={styles.statusBadgeContainer}>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor: AC.systemGray5,
                      },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: "#1f2937" }]}>
                      Loading...
                    </Text>
                  </View>
                </View>
              </View>

              {/* Content Section */}
              <View style={styles.detailsContainer}>
                <View style={styles.headerContainer}>
                  <View style={styles.titleContainer}>
                    <View
                      style={{
                        backgroundColor: AC.systemGray5,
                        height: 20,
                        width: "60%",
                        marginBottom: 4,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: AC.systemGray5,
                        height: 14,
                        width: "40%",
                      }}
                    />
                  </View>
                  <View style={styles.timeContainer}>
                    <View
                      style={{
                        backgroundColor: AC.systemGray5,
                        height: 24,
                        width: 60,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: AC.systemGray5,
                        height: 14,
                        width: 40,
                        marginTop: 4,
                      }}
                    />
                  </View>
                </View>

                <CountdownTimer targetDate={new Date()} />

                <View
                  style={{
                    backgroundColor: AC.systemGray5,
                    height: 16,
                    width: "80%",
                    marginTop: 12,
                    marginBottom: 16,
                  }}
                />

                <View style={styles.footer}>
                  <View style={styles.metadataContainer}>
                    <View style={styles.metadataItem}>
                      <Ionicons
                        name="location"
                        size={16}
                        color={AC.systemGray5}
                      />
                      <View
                        style={{
                          backgroundColor: AC.systemGray5,
                          height: 14,
                          width: 80,
                        }}
                      />
                    </View>
                    <View style={styles.metadataItem}>
                      <Ionicons name="globe" size={16} color={AC.systemGray5} />
                      <View
                        style={{
                          backgroundColor: AC.systemGray5,
                          height: 14,
                          width: 80,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = {
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: AC.label,
    padding: 16,
    paddingTop: 24,
  },
  launchList: {
    padding: 16,
    gap: 16,
  },
  launchCard: {
    backgroundColor: AC.secondarySystemGroupedBackground,
    borderRadius: 12,
    overflow: "hidden",
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
    backgroundColor: AC.systemGroupedBackground,
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

  timeContainer: {
    alignItems: "flex-end",
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

  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  liveText: {
    fontSize: 14,
    color: "#059669",
  },
} as const;
