import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
