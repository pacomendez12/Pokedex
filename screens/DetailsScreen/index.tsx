import i18n from "i18n-js";
import * as React from "react";
import { StyleSheet } from "react-native";

import Loading from "../../components/Loading";
import NoInternet from "../../components/NoInternet";
import StatisticsViewer from "../../components/StatisticsViewer";
import { Text, View } from "../../components/Themed";
import { useStateValue } from "../../state";
import Header from "./components/Header";
import useFetchDetailsData from "./hooks/useFetchDetailsData";

const getBeautifiedStatName = (name: string): string => {
  const obj: object = {
    hp: "Hp",
    attack: "Attack",
    defense: "Defense",
    speed: "Speed",
    "special-attack": "Sp Atk",
    "special-defense": "Sp Def",
  };
  return obj[name];
};

type Stat = {
  stat: { name: string };
  base_stat: string;
};

export default function DetailScreen({ route }) {
  const [{ hasInternet }] = useStateValue();
  const { url, id } = route.params;

  const {
    pokemonData,
    specieDescription,
    errorPokemon,
    loadingPokemon,
  } = useFetchDetailsData(url, id);

  if (loadingPokemon) return <Loading />;
  if ((!pokemonData && !hasInternet) || errorPokemon) return <NoInternet />;

  const renderDescription = () => {
    return (
      <View
        style={{ marginTop: 15, marginBottom: 5 }}
        colorName="secondaryBackground"
      >
        <Text style={styles.description} numberOfLines={3}>
          {specieDescription}
        </Text>
      </View>
    );
  };

  const renderStats = () => {
    return (
      <StatisticsViewer
        stats={
          pokemonData?.stats.map(({ stat, base_stat }: Stat) => ({
            name: i18n.t(getBeautifiedStatName(stat.name)),
            value: base_stat,
          })) || []
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.body} colorName="secondaryBackground">
        <Header
          {...route.params}
          height={pokemonData?.height}
          weight={pokemonData?.weight}
        />
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
  },
  body: {
    alignSelf: "stretch",
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  description: {
    textAlign: "center",
    minHeight: 65,
    lineHeight: 25,
    fontSize: 18,
  },
});
