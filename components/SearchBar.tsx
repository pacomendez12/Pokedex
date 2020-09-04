import * as React from "react";
import {
  StyleSheet,
  Button,
  Platform,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from "react-native";
import { Input } from "react-native-elements";

import { View } from "./Themed";

const isIos = Platform.OS === "ios";

const MAIN_BASE_COLOR = "#f3f3f3";
const SECONDARY_BASE_COLOR = "#8f8f91";

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
    >
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
  const [text, setText] = React.useState("");
  const [hasFocus, setHasFocus] = React.useState(false);
  const input = React.createRef<Input>();

  const handleFocus = () => {
    setHasFocus(true);
  };

  const handleBlur = () => {
    setHasFocus(false);
  };

  const renderCancelButton = () => {
    return (
      isIos &&
      hasFocus && <CancelButton onCancel={() => input.current?.blur()} />
    );
  };

  const inputRightElement =
    isIos && hasFocus
      ? false
      : {
          type: "ionicon",
          name: "ios-mic",
          color: SECONDARY_BASE_COLOR,
        };

  return (
    <View style={styles.container}>
      <Input
        ref={input}
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
        onSubmitEditing={(event) => onSearch(event.nativeEvent.text)}
      />
      {renderCancelButton()}
    </View>
  );
}

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
    backgroundColor: MAIN_BASE_COLOR,
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0,
  },
});
