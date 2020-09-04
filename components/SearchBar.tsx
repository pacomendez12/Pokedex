import i18n from "i18n-js";
import * as React from "react";
import {
  StyleSheet,
  Button,
  Platform,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";

import { Input, InputProps, View } from "../components/Themed";
import Colors from "../constants/Colors";

const isAndroid = Platform.OS === "android";

const SECONDARY_BASE_COLOR = "#8f8f91";

export default function SearchBar({ onSearch }: Props) {
  const [text, setText] = React.useState("");
  const [hasFocus, setHasFocus] = React.useState(false);
  const input = React.createRef<InputProps>();

  const shouldShowCancelButton = () => {
    return hasFocus || text !== "";
  };

  const handleFocus = () => {
    setHasFocus(true);
  };

  const handleBlur = () => {
    setHasFocus(false);
  };

  const renderCancelButton = () => {
    return (
      shouldShowCancelButton() && (
        <CancelButton
          onCancel={() => {
            input.current?.blur();
            setText("");
            onSearch("");
          }}
        />
      )
    );
  };

  const inputRightElement = shouldShowCancelButton()
    ? false
    : {
        type: "ionicon",
        name: "ios-mic",
        color: SECONDARY_BASE_COLOR,
      };

  return (
    <View
      style={styles.container}
      lightColor={Colors.light.secondaryBackground}
      darkColor={Colors.dark.background}
    >
      <Input
        ref={input}
        placeholder={i18n.t("Search")}
        containerStyle={styles.inputMainContainer}
        inputContainerStyle={styles.inputContainer}
        leftIcon={{
          type: "ionicon",
          name: "ios-search",
          color: SECONDARY_BASE_COLOR,
        }}
        rightIcon={inputRightElement}
        value={text}
        onChangeText={(value) => setText(value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={() => onSearch(text)}
      />
      {renderCancelButton()}
    </View>
  );
}

const CancelButton = ({
  onCancel,
}: {
  onCancel: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        paddingRight: 10,
      }}
      lightColor={Colors.light.secondaryBackground}
      darkColor={Colors.dark.background}
    >
      <Button
        color={isAndroid && Colors.shared.appColor}
        title={i18n.t("Cancel")}
        onPress={onCancel}
      />
    </View>
  );
};

type Props = {
  onSearch: (value: string) => void;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "center",
    height: 59,
  },
  inputMainContainer: {
    flexGrow: 1,
    width: 100,
  },
  inputContainer: {
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0,
  },
});
