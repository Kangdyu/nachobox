import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieApi, tvApi } from "api/api";
import { MovieListItem, TVListItem } from "api/types";
import { AxiosError } from "axios";
import { FetchError, RootState } from "modules";

type SearchState = {
  [query: string]: {
    movies: MovieListItem[];
    tvShows: TVListItem[];
    loading: boolean;
    error: null | string;
  };
};

const initialState: SearchState = {};

export const fetchSearchResults = createAsyncThunk<
  { movies: MovieListItem[]; tvShows: TVListItem[] },
  string,
  { state: RootState }
>(
  "search/fetchSearchResults",
  async (query, { rejectWithValue }) => {
    try {
      const movieRes = await movieApi.search(query);
      const tvRes = await tvApi.search(query);

      return {
        movies: movieRes.data.results,
        tvShows: tvRes.data.results,
      };
    } catch (error) {
      let err: AxiosError<FetchError> = error;
      if (!err.response) {
        throw error;
      }
      return rejectWithValue(err.response.data.status_message);
    }
  },
  {
    condition: (query, { getState }) => {
      const { search } = getState();

      if (search[query]) {
        return false;
      }
    },
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state, action) => {
      state[action.meta.arg] = {
        movies: [],
        tvShows: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state[action.meta.arg].movies = action.payload.movies;
      state[action.meta.arg].tvShows = action.payload.tvShows;
      state[action.meta.arg].loading = false;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state[action.meta.arg].error = action.payload as string;
      state[action.meta.arg].loading = false;
    });
  },
});

export default searchSlice.reducer;
