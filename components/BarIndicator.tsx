import { LinearGradient } from "expo-linear-gradient";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Color from "../constants/Colors";

const VISUAL_BAR_PERCENTAGE = 86;

export default function BarIndicator({
  value,
  minimumValue,
  maximumValue,
  containerStyle,
}: {
  value: number;
  minimumValue: number;
  maximumValue: number;
  containerStyle?: object;
}) {
  let visualValue = value > minimumValue ? value : minimumValue;
  visualValue = visualValue < maximumValue ? visualValue : maximumValue;
  const percentage =
    ((visualValue - minimumValue) * 100) / (maximumValue - minimumValue) || 1;

  const indicatorOffset = (percentage * VISUAL_BAR_PERCENTAGE) / 100;

  return (
    <View
      style={[styles.slider, containerStyle]}
      colorName="secondaryBackground"
    >
      <View style={{ flexDirection: "row" }}>
        <LinearGradient
          colors={["#1f7dd0", "#45a2c8"]}
          style={[styles.bar, { width: `${percentage}%` }]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
        <View style={[styles.bar, { width: `${100 - percentage}%` }]} />
      </View>
      <View style={[styles.indicator, { left: `${indicatorOffset}%` }]}>
        <Text style={styles.value} darkColor={Color.light.text}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {
    height: 40,
    justifyContent: "center",
    padding: 3,
  },
  bar: {
    backgroundColor: "#d8d8d8",
    borderRadius: 3,
    alignSelf: "stretch",
    height: 12,
  },
  indicator: {
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    padding: 3,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  value: {
    fontSize: 12,
  },
});
