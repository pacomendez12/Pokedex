import * as React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  // Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import GridView from "../components/GridView";
import { Text, View } from "../components/Themed";
import { AppPokemon } from "../types";

const dimensions = Dimensions.get("window");
const itemSize = (dimensions.width - 25) / 3;

const keyExtractor = (item: AppPokemon, index: number) => item.id;

const renderLoading = () => {
  return (
    <View style={{ alignContent: "center", backgroundColor: "transparent" }}>
      <ActivityIndicator size="small" color="#c2252c" />
    </View>
  );
};

export default function PokemonGridView(props: {
  items: AppPokemon[];
  onEndReached: (info: { distanceFromEnd: number }) => void;
  openDetailsScreen: (data: any) => void;
  showLoading: boolean;
}) {
  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#dddddd"
        onPress={() => props.openDetailsScreen(item)}
      >
        <View style={styles.item}>
          <Image uri={item.thumbnailUrl} style={styles.itemImage} />
          <Text>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.gridContainer}>
      <GridView {...props} renderer={renderItem} keyExtractor={keyExtractor} />
      {/* {props.showLoading && renderLoading()} */}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    marginTop: 3,
    marginLeft: 3,
    marginRight: 3,
    flexGrow: 1,
    alignSelf: "stretch",
    backgroundColor: "#f3f3f3",
  },
  item: {
    flex: 1,
    flexDirection: "column",
    margin: 3,
    borderRadius: 3,
    aspectRatio: 1,
    width: itemSize,
    height: itemSize,
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
  },
});
