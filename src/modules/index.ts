import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies";
import tvShowsReducer from "./tvShows";
import searchReducer from "./search";

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
  search: searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type FetchError = {
  status_code: number;
  status_message: string;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
