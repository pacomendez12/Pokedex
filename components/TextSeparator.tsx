import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

export default function TextSeparator({ text }: { text: string }) {
  return (
    <View style={styles.statsHeader}>
      <View style={[styles.line, { marginRight: 10 }]} />
      <Text style={styles.statsHeaderText}>{text}</Text>
      <View style={[styles.line, { marginLeft: 10 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  statsHeader: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  statsHeaderText: {
    letterSpacing: 2,
    color: "#999",
    fontSize: 12,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
    flexGrow: 1,
  },
});
