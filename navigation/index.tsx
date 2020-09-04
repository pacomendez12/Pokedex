import NetInfo from "@react-native-community/netinfo";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, Image, StyleSheet } from "react-native";

import { SET_HAS_INTERNET } from "../actionTypes";
import DetailsScreen from "../screens/DetailsScreen";
import MainScreen from "../screens/MainScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { useStateValue } from "../state";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      dispatch({ type: SET_HAS_INTERNET, payload: state.isConnected });
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
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
        options={{ headerBackTitle: "Back" }}
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
  header: { backgroundColor: "#c2252c" },
  headerLogo: {
    width: 110,
    height: 40,
  },
});
