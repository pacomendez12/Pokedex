import i18n from "i18n-js";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import BarIndicator from "./BarIndicator";
import TextSeparator from "./TextSeparator";

type Stats = {
  name: string;
  value: number;
};

export default function StatisticsViewer({ stats }: { stats: Stats[] }) {
  return (
    <View style={styles.mainContainer} colorName="secondaryBackground">
      <TextSeparator text={i18n.t("STATISTICS")} />
      {stats?.map((stat) => {
        return (
          <View
            key={stat.name}
            style={styles.barsContainer}
            colorName="secondaryBackground"
          >
            <Text numberOfLines={1} style={{ flex: 2, color: "gray" }}>
              {stat.name}
            </Text>
            <BarIndicator
              containerStyle={{ flex: 8 }}
              value={stat.value}
              minimumValue={0}
              maximumValue={150}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    flexDirection: "column",
    padding: 5,
    alignItems: "center",
  },
  barsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
