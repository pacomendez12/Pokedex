import * as React from "react";

import ApiUrls from "../constants/Url";
import { AppPokemon } from "../types";
import { convertApiPokemonToAppPokemon } from "../util/pokemon";

export default function useSearchedPokemon(searchText: string) {
  const [searchedPokemonsData, setSearchedPokemonsData] = React.useState<
    AppPokemon[]
  >([]);

  React.useEffect(() => {
    const fetchPokemonData = async () => {
      const baseUrl = `${ApiUrls.pokeApiUrl}pokemon/`;
      const url = `${baseUrl}${searchText.toLowerCase()}`;
      const response = await fetch(url);
      if (response.status === 200) {
        const pokemon = await response.json();
        return setSearchedPokemonsData([
          convertApiPokemonToAppPokemon({
            name: pokemon.name,
            url: `${baseUrl}${pokemon.id}/`,
          }),
        ]);
      }
      return setSearchedPokemonsData([]);
    };
    if (searchText !== "") {
      fetchPokemonData();
    }

    return () => setSearchedPokemonsData([]);
  }, [searchText]);

  return searchedPokemonsData;
}
