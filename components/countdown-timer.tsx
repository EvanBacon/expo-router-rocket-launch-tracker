"use client";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import * as AColors from "@bacons/apple-colors";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    const timer = setInterval(update, 1000);

    update();
    return () => clearInterval(timer);
  }, [targetDate]);

  // return null if the target date is more than 24 hours in the future
  //   if (targetDate.getTime() - new Date().getTime() > 24 * 60 * 60 * 1000) {
  //     return null;
  //   }

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        {/* Hours */}
        <View style={styles.timeBlock}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>
              {String(timeLeft.hours).padStart(2, "0")}
            </Text>
          </View>
          <Text style={styles.label}>Hours</Text>
        </View>

        {/* Minutes */}
        <View style={styles.timeBlock}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>
              {String(timeLeft.minutes).padStart(2, "0")}
            </Text>
          </View>
          <Text style={styles.label}>Mins</Text>
        </View>

        {/* Seconds */}
        <View style={styles.timeBlock}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>
              {String(timeLeft.seconds).padStart(2, "0")}
            </Text>
          </View>
          <Text style={styles.label}>Secs</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  timerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  timeBlock: {
    alignItems: "center",
    gap: 8,
  },
  numberContainer: {
    backgroundColor: AColors.systemGray6,
    borderRadius: 8,
    padding: 16,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 32,
    fontWeight: "700",
    color: AColors.label,
    // Use monospace font
    fontVariant: ["tabular-nums"],
  },
  label: {
    fontSize: 16,
    color: AColors.secondaryLabel,
    fontWeight: "500",
  },
});

export default CountdownTimer;
