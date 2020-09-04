import { render, fireEvent, cleanup } from "@testing-library/react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import * as React from "react";
import renderer from "react-test-renderer";

import SearchBar from "../SearchBar";

i18n.translations = {
  en: require("../../translations/en.json"),
  es: require("../../translations/es.json"),
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

describe("<SearchBar> tests", () => {
  afterEach(cleanup);

  it("searchBar by default shows only input component", () => {
    const tree = renderer.create(<SearchBar onSearch={() => {}} />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("searchBar should show cancel button on focus", async () => {
    const mockFn = jest.fn();
    const { getByText, findByPlaceholderText } = render(
      <SearchBar onSearch={mockFn} />
    );

    const input = await findByPlaceholderText("Search");
    fireEvent(input, "focus");

    expect(getByText("Cancel")).not.toBeNull();
  });

  it("searchBar should not keep cancel button on blur if it doesn't contains text", async () => {
    const mockFn = jest.fn();
    const { findByPlaceholderText, toJSON } = render(
      <SearchBar onSearch={mockFn} />
    );

    const input = await findByPlaceholderText("Search");
    fireEvent(input, "focus");
    fireEvent(input, "blur");

    const tree = toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("searchBar should keep cancel button on blur if contains text", async () => {
    const mockFn = jest.fn();
    const { getByText, findByPlaceholderText } = render(
      <SearchBar onSearch={mockFn} />
    );

    const input = await findByPlaceholderText("Search");
    fireEvent(input, "focus");
    fireEvent(input, "onChangeText", "something");
    fireEvent(input, "blur");

    expect(getByText("Cancel")).not.toBeNull();
  });

  it("searchBar call parent onSearch function with searchBar text", async () => {
    const mockFn = jest.fn();
    const { findByPlaceholderText } = render(<SearchBar onSearch={mockFn} />);

    const input = await findByPlaceholderText("Search");
    fireEvent(input, "focus");
    fireEvent(input, "onChangeText", "something");
    fireEvent(input, "onSubmitEditing");

    expect(mockFn).toBeCalledWith("something");
  });

  it("searchBar calls onSearch and later clear that value", async () => {
    const mockFn = jest.fn();
    const { getByText, findByPlaceholderText } = render(
      <SearchBar onSearch={mockFn} />
    );

    const input = await findByPlaceholderText("Search");
    fireEvent(input, "focus");
    fireEvent(input, "onChangeText", "something");
    fireEvent(input, "onSubmitEditing");

    fireEvent(input, "focus");

    fireEvent(getByText("Cancel"), "press");

    expect(mockFn).toBeCalledWith("something");
    expect(mockFn).toBeCalledWith("");
  });

  it(`SearchBar renders correctly`, async () => {
    const tree = renderer.create(<SearchBar onSearch={() => {}} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
