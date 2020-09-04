import * as React from "react";
import { StyleSheet, FlatList, ListRenderItem } from "react-native";

type GridProps = {
  items: any[];
  renderer: ListRenderItem<any>;
  keyExtractor: (item: any, index: number) => string;
  onEndReached: (info: { distanceFromEnd: number }) => void;
};

export default function GridView({
  items,
  renderer,
  keyExtractor,
  onEndReached,
}: GridProps) {
  return (
    <FlatList
      data={items}
      renderItem={renderer}
      numColumns={3}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      onEndReached={onEndReached}
      initialNumToRender={50}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
