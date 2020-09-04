import i18n from "i18n-js";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import { Text, View } from "../../../components/Themed";
import { padLeft } from "../../../util/string";

const BoldText = ({ text, style }: { text: string; style?: object }) => {
  return <Text style={[{ fontWeight: "bold" }, style]}>{text}</Text>;
};

export default function Header({ name, id, thumbnailUrl, height, weight }) {
  const renderHeaderInfo = () => {
    return (
      <View style={styles.info} colorName="secondaryBackground">
        <Text>#{padLeft(id, 3)}</Text>
        <Text style={styles.pokemonName}>{name}</Text>
        <Text>
          <BoldText text={i18n.t("Height") + ":"} /> {height / 10}m
        </Text>
        <Text>
          <BoldText text={i18n.t("Weight") + ":"} /> {weight / 10}
          kg
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.header} colorName="secondaryBackground">
      <View style={styles.imageContainer} colorName="secondaryBackground">
        <Image uri={thumbnailUrl} style={styles.image} />
      </View>
      {renderHeaderInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 130,
    height: 130,
  },
  imageContainer: {
    flex: 3,
    alignItems: "flex-end",
  },
  info: {
    flex: 4,
    flexDirection: "column",
    height: 110,
    justifyContent: "space-between",
  },
  pokemonName: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
