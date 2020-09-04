import NetInfo from "@react-native-community/netinfo";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import i18n from "i18n-js";
import * as React from "react";
import { ColorSchemeName, Image, StyleSheet } from "react-native";

import { SET_HAS_INTERNET } from "../actionTypes";
import Color from "../constants/Colors";
import DetailsScreen from "../screens/DetailsScreen";
import MainScreen from "../screens/MainScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { useStateValue } from "../state";
import { RootStackParamList } from "../types";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch({ type: SET_HAS_INTERNET, payload: state.isConnected });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: styles.header,
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerTitle: HeaderLogo,
      }}
    >
      <Stack.Screen name="Root" component={MainScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerBackTitle: i18n.t("Back") }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}

function HeaderLogo() {
  return (
    <Image
      source={require("../assets/images/logo_pokemon.png")}
      style={styles.headerLogo}
    />
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: Color.shared.appColor },
  headerLogo: {
    width: 110,
    height: 40,
  },
});
