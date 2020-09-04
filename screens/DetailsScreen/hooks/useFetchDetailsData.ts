import * as React from "react";
import useFetch from "use-http";

import ApiUrls from "../../../constants/Url";
import { useStateValue } from "../../../state";

const baseSpecieUrl = `${ApiUrls.pokeApiUrl}pokemon-species/`;

export default function useFetchDetailsData(url, id) {
  const [{ hasInternet }] = useStateValue();
  const [specieDescription, setSpecieDescription] = React.useState("");

  const specieUrl = `${baseSpecieUrl}${id}`;

  const {
    loading: loadingPokemon,
    error: errorPokemon,
    data: pokemonData,
  } = useFetch(url, {}, [hasInternet]);

  const { error: errorSpecie, data: dataSpecie } = useFetch(specieUrl, {}, [
    hasInternet,
  ]);

  React.useEffect(() => {
    if (dataSpecie && !errorSpecie) {
      const flavor = dataSpecie?.flavor_text_entries.find((flavor) => {
        return flavor?.version?.name === "diamond";
      });

      if (flavor) {
        setSpecieDescription(flavor?.flavor_text?.replace(/\n/g, " ") || "");
      }
    }
  }, [dataSpecie, errorSpecie]);

  return { pokemonData, specieDescription, errorPokemon, loadingPokemon };
}
