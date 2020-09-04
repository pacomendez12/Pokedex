import i18n from "i18n-js";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";
import useFetch from "use-http";

import Loading from "../components/Loading";
import NoInternet from "../components/NoInternet";
import StatisticsViewer from "../components/StatisticsViewer";
import { Text, View } from "../components/Themed";
import { useStateValue } from "../state";
import { padLeft } from "../util/string";

const BoldText = ({ text, style }: { text: string; style?: object }) => {
  return <Text style={[{ fontWeight: "bold" }, style]}>{text}</Text>;
};

const getBeautifiedStatName = (name: string): string => {
  const obj: StatNames = {
    hp: "Hp",
    attack: "Attack",
    defense: "Defense",
    speed: "Speed",
    "special-attack": "Sp Atk",
    "special-defense": "Sp Def",
  };

  return obj[name];
};

export default function DetailScreen({ route }) {
  const [{ hasInternet }] = useStateValue();
  const [specie, setSpecie] = React.useState({});
  const { name, url, id, thumbnailUrl } = route.params;

  const { loading, error, data } = useFetch(url, {}, [hasInternet]);

  // React.useEffect(() => {
  //   if (!_.isEmpty(data)) {
  //     const fetchSpecies = async () => {};

  //     fetchSpecies();
  //   }
  // }, [data]);

  type Stat = {
    stat: { name: string };
    base_stat: string;
  };

  if (loading) return <Loading />;

  if (!data && !hasInternet) return <NoInternet />;

  const renderHeaderInfo = () => {
    return (
      <View style={styles.info}>
        <Text>#{padLeft(id, 3)}</Text>
        <Text style={styles.pokemonName}>{name}</Text>
        <Text>
          <BoldText text={i18n.t("Height") + ":"} /> {data?.height / 10}m
        </Text>
        <Text>
          <BoldText text={i18n.t("Weight") + ":"} /> {data?.weight / 10}kg
        </Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image uri={thumbnailUrl} style={styles.image} />
        </View>
        {renderHeaderInfo()}
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <View style={{ marginTop: 15, marginBottom: 5 }}>
        <Text style={styles.description} numberOfLines={2}>
          Description lfljkasf fasdfkjasd fdsfasdfas fasdf asfsd asdfsadlkasfd
        </Text>
      </View>
    );
  };

  const renderStats = () => {
    return (
      <StatisticsViewer
        stats={data.stats.map(({ stat, base_stat }: Stat) => ({
          name: i18n.t(getBeautifiedStatName(stat.name)),
          value: base_stat,
        }))}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {renderHeader()}
        {renderDescription()}
        {renderStats()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f3f3f3",
  },
  body: {
    alignSelf: "stretch",
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
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
  description: {
    textAlign: "center",
    lineHeight: 25,
    fontSize: 16,
  },
});
