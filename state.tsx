import * as React from "react";

import { StoreElements } from "./types";

type Action = { type: string; payload: any };

// type Reducer = [StoreElements, React.Dispatch<Action>];
type Reducer = [StoreElements, React.Dispatch<Action>];

export const StateContext = React.createContext<Reducer | undefined>(undefined);
export const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  reducer: (state: StoreElements, action: Action) => StoreElements;
  initialState: StoreElements;
  children: React.ReactNode;
}) => (
  <StateContext.Provider value={React.useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () =>
  React.useContext<Reducer | undefined>(StateContext);
