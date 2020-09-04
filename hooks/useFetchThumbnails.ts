import AsyncStorage from "@react-native-community/async-storage";
import FileSystem from "expo-file-system";
import { isLoading } from "expo-font";
import * as React from "react";
import useFetch from "use-http";

import { pokemonsListKey } from "../constants/StorageKeys";
import ApiUrls from "../constants/Url";
import { capitalize } from "../util/string";

export default function useFetchThumbnails(pokemons) {}

FileSystem.downloadAsync(
  "http://techslides.com/demos/sample-videos/small.mp4",
  FileSystem.documentDirectory + "small.mp4"
)
  .then(({ uri }) => {
    console.log("Finished downloading to ", uri);
  })
  .catch((error) => {
    console.error(error);
  });
