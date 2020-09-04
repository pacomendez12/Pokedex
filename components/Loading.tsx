// Image from: https://i.pinimg.com/originals/25/d2/54/25d254df236c61306bceb86df5f671f1.gif
import i18n from "i18n-js";
import * as React from "react";
import { StyleSheet, Image } from "react-native";

import { View, Text } from "./Themed";

export default function Loading(props: { style?: object }) {
  return (
    <View
      style={[
        { flex: 1, alignItems: "center", justifyContent: "center" },
        props.style,
      ]}
    >
      <Image
        style={styles.loading}
        source={require("../assets/images/loading.gif")}
      />
      <Text style={styles.text}>{i18n.t("Loading")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    width: 100,
    height: 80,
  },
  text: {
    backgroundColor: "#c2252c",
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    fontSize: 20,
    color: "white",
  },
});
