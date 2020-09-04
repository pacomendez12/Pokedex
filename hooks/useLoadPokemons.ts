import AsyncStorage from "@react-native-community/async-storage";
import { isLoading } from "expo-font";
import * as React from "react";
import useFetch from "use-http";

import { pokemonsListKey } from "../constants/StorageKeys";
import ApiUrls from "../constants/Url";
import { useStateValue } from "../state";
import { ApiResponsePokemon, ApiResponse, AppPokemon } from "../types";
import { convertApiPokemonToAppPokemon } from "../util/pokemon";

const ITEMS_PER_PAGE = 50;

const initialUrl = `${ApiUrls.pokeApiUrl}pokemon/?limit=${ITEMS_PER_PAGE}`;

export default function useLoadPokemons(userEndCounter: number) {
  const [{ hasInternet }] = useStateValue();
  const [pokemons, setPokemons] = React.useState<AppPokemon[]>([]);
  const [isFirstFetch, setIsFirstFetch] = React.useState(true);
  const nextUrl = React.useRef<string | undefined>(initialUrl);
  const loadedCache = React.useRef<boolean>(false);

  const { loading, error, data } = useFetch<ApiResponse>(nextUrl.current, {}, [
    userEndCounter,
  ]);

  const isDoingFirstFetch = hasInternet && isLoading && isFirstFetch;

  React.useEffect(() => {
    if (!error && !loading && data) {
      nextUrl.current = data.next || undefined;
      const newPokemons = data.results.map(convertApiPokemonToAppPokemon);

      setPokemons((oldPokemonsData) => [...oldPokemonsData, ...newPokemons]);

      setIsFirstFetch(false);
    } else if (error) {
      setIsFirstFetch(false);
    }
  }, [loading, error, data]);

  React.useEffect(() => {
    AsyncStorage.setItem(pokemonsListKey, JSON.stringify(pokemons));
  }, [pokemons]);

  React.useEffect(() => {
    const loadPokedexDataFromLocal = async () => {
      const loadedJSON = await AsyncStorage.getItem(pokemonsListKey);
      let loadedFromLocal = [];
      if (loadedJSON) {
        loadedFromLocal = JSON.parse(loadedJSON);
        setPokemons(loadedFromLocal);
        nextUrl.current = `${initialUrl}&offset=${loadedFromLocal.length}`;
      }
    };

    if (!loadedCache.current && (!hasInternet || error)) {
      loadPokedexDataFromLocal();
      loadedCache.current = true;
    }
  }, [hasInternet, error]);

  return { pokemons, loading, isDoingFirstFetch };
}
