// Image from: https://www.vhv.rs/dpng/d/371-3718139_image-of-pikachu-decal-cartoon-hd-png-download.png
import i18n from "i18n-js";
import * as React from "react";
import { StyleSheet, Image } from "react-native";

import { View, Text } from "./Themed";

export default function NoInternet(props: { style?: object }) {
  return (
    <View
      style={[
        { flex: 1, alignItems: "center", justifyContent: "center" },
        props.style,
      ]}
    >
      <Image
        style={styles.image}
        source={require("../assets/images/pikachu_sad.png")}
      />
      <Text style={styles.text}>{i18n.t("Oh no! Connection lost")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    aspectRatio: 1,
  },
  text: {
    backgroundColor: "transparent",
    marginTop: 20,
    fontSize: 20,
    color: "gray",
  },
});
