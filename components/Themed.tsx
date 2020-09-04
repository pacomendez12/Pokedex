import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { Input as DefaultInput } from "react-native-elements";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  colorName?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type InputProps = ThemeProps & DefaultInput["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, colorName, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName || "text"
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, colorName, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName || "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const Input = React.forwardRef((props: InputProps, ref: any) => {
  const theme = useColorScheme();

  const {
    inputStyle,
    inputContainerStyle,
    containerStyle,
    leftIconContainerStyle,
    rightIconContainerStyle,
    lightColor,
    darkColor,
    colorName,
    ...otherProps
  } = props;
  const backgroundColorContainer = useThemeColor(
    { light: lightColor, dark: darkColor },
    theme === "light" ? "secondaryBackground" : "background"
  );

  const backgroundColorInput = useThemeColor(
    { light: lightColor, dark: darkColor },
    theme === "light" ? "background" : "secondaryBackground"
  );

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <DefaultInput
      ref={ref}
      containerStyle={[
        { backgroundColor: backgroundColorContainer },
        containerStyle,
      ]}
      inputContainerStyle={[
        { backgroundColor: backgroundColorInput },
        inputContainerStyle,
      ]}
      inputStyle={[
        { backgroundColor: backgroundColorInput, color: textColor },
        inputStyle,
      ]}
      leftIconContainerStyle={[
        { backgroundColor: backgroundColorInput },
        leftIconContainerStyle,
      ]}
      rightIconContainerStyle={[
        { backgroundColor: backgroundColorInput },
        leftIconContainerStyle,
      ]}
      {...otherProps}
    />
  );
});
