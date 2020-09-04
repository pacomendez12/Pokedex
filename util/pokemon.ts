import ApiUrls from "../constants/Url";
import { ApiResponsePokemon, AppPokemon } from "../types";
import { capitalize } from "./string";

export function convertApiPokemonToAppPokemon({
  name,
  url,
}: ApiResponsePokemon): AppPokemon {
  const tokens = url.split("/");
  const id = tokens[tokens.length - 2];
  name = capitalize(name);
  const thumbnailUrl = `${ApiUrls.spritesBaseUrl}pokemon/${id}.png`;
  return { id, name, url, thumbnailUrl };
}
