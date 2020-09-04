import i18n from "i18n-js";
import * as React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../components/Themed";
import { useStateValue } from "../state";

function renderErrorMessage() {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{i18n.t("No internet connection")}</Text>
    </View>
  );
}

export default function WithConnectionMessage(
  Component: React.FunctionComponent
) {
  return (props: any) => {
    const [{ hasInternet }] = useStateValue();

    return (
      <View style={styles.container}>
        <Component {...props} />
        {!hasInternet && renderErrorMessage()}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  errorText: {
    color: "white",
  },
});
