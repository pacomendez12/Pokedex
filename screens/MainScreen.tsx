import * as React from "react";
import { StyleSheet } from "react-native";

import WithConnectionMessage from "../HOC/WithConnectionMessage";
import Loading from "../components/Loading";
import PokemonGridView from "../components/PokemonsGridView";
import SearchBar from "../components/SearchBar";
import { View } from "../components/Themed";
import useLoadPokemons from "../hooks/useLoadPokemons";
import useSearchedPokemon from "../hooks/useSearchPokemon";

function MainScreen({ navigation }) {
  const [endCounter, setEndCounter] = React.useState(0);
  const [searched, setSearched] = React.useState("");

  const { pokemons, loading, isDoingFirstFetch } = useLoadPokemons(endCounter);
  const searchedPokemon = useSearchedPokemon(searched);

  const shouldShowSearched = () => {
    return searched !== "";
  };

  const onEndReached = React.useCallback(() => {
    setEndCounter((prev) => prev + 1);
  }, []);

  const openDetailsScreen = React.useCallback(
    (data) => {
      navigation.navigate("Details", data);
    },
    [navigation]
  );

  const onSearch = React.useCallback((value) => {
    setSearched(value);
  }, []);

  if (isDoingFirstFetch) {
    return <Loading style={styles.container} />;
  }

  return (
    <View style={styles.container} colorName="background">
      <SearchBar onSearch={onSearch} />
      <PokemonGridView
        items={shouldShowSearched() ? searchedPokemon : pokemons}
        onEndReached={onEndReached}
        openDetailsScreen={openDetailsScreen}
        showLoading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default WithConnectionMessage(MainScreen);
