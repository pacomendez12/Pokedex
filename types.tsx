export type RootStackParamList = {
  Root: undefined;
  Details: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type StoreElements = {
  hasInternet: boolean;
};

export type AppPokemon = {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
};

export type ApiResponsePokemon = {
  name: string;
  url: string;
};

export type ApiResponse = {
  count: number;
  next: string | undefined;
  previous: string | undefined;
  results: ApiResponsePokemon[];
};
