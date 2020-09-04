import * as Localization from "expo-localization";
import { StatusBar } from "expo-status-bar";
import i18n from "i18n-js";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SET_HAS_INTERNET } from "./actionTypes";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { StateProvider } from "./state";
import type { StoreElements } from "./types";

i18n.translations = {
  en: require("./translations/en.json"),
  es: require("./translations/es.json"),
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

const storeInitialState = {
  hasInternet: true,
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const reducer = (
    state: StoreElements,
    action: { type: string; payload: any }
  ) => {
    switch (action.type) {
      case SET_HAS_INTERNET:
        return { ...state, hasInternet: action.payload };
      default:
        return state;
    }
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StateProvider initialState={storeInitialState} reducer={reducer}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar style="light" backgroundColor="black" />
        </StateProvider>
      </SafeAreaProvider>
    );
  }
}
