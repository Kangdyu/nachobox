import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieApi } from "api/api";
import { CreditsInfo, MovieDetail, MovieListItem, VideoInfo } from "api/types";
import { AxiosError } from "axios";
import { RootState } from "modules";

type MoviesState = {
  categories: {
    nowPlaying: MovieListItem[];
    popular: MovieListItem[];
    topRated: MovieListItem[];
    upcoming: MovieListItem[];
    loading: boolean;
    error: null | string;
  };
  details: {
    [id: number]: {
      detail: MovieDetail;
      videos: VideoInfo;
      credits: CreditsInfo;
      recommendations: MovieListItem[];
      loading: boolean;
      error: null | string;
    };
  };
  searches: {
    [query: string]: {
      results: MovieListItem[];
      loading: boolean;
      error: null | string;
    };
  };
};

const initialState: MoviesState = {
  categories: {
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
    loading: false,
    error: null,
  },
  details: {},
  searches: {},
};

export const fetchMovieCategories = createAsyncThunk<
  any,
  undefined,
  { state: RootState }
>(
  "movies/fetchMovieCategories",
  async (_, { rejectWithValue }) => {
    try {
      const nowPlaying = await movieApi.nowPlaying();
      const popular = await movieApi.popular();
      const topRated = await movieApi.topRated();
      const upcoming = await movieApi.upcoming();
      return {
        nowPlaying: nowPlaying.data.results,
        popular: popular.data.results,
        topRated: topRated.data.results,
        upcoming: upcoming.data.results,
      };
    } catch (error) {
      let err: AxiosError = error;
      if (!err.response) {
        throw error;
      }
      return rejectWithValue(err.response.data);
    }
  },
  {
    condition: (_, { getState }) => {
      const {
        movies: {
          categories: { nowPlaying, popular, topRated, upcoming },
        },
      } = getState();
      if (
        nowPlaying.length !== 0 &&
        popular.length !== 0 &&
        topRated.length !== 0 &&
        upcoming.length !== 0
      ) {
        return false;
      }
    },
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (movieId: number, { rejectWithValue }) => {
    try {
      const response = await movieApi.detail(movieId);
      return response.data;
    } catch (error) {
      let err: AxiosError = error;
      if (!err.response) {
        throw error;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchMovieSearchResults = createAsyncThunk(
  "movies/fetchMovieSearchResults",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await movieApi.search(query);
      return response.data;
    } catch (error) {
      let err: AxiosError = error;
      if (!err.response) {
        throw error;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieCategories.pending, (state, action) => {
      if (state.categories.loading === false) {
        state.categories.loading = true;
      }
    });
    builder.addCase(fetchMovieCategories.fulfilled, (state, action) => {
      if (state.categories.loading === true) {
        const { nowPlaying, popular, topRated, upcoming } = action.payload;
        state.categories = {
          nowPlaying,
          popular,
          topRated,
          upcoming,
          loading: false,
          error: null,
        };
      }
    });
    builder.addCase(fetchMovieCategories.rejected, (state, action) => {
      if (state.categories.loading === true) {
        state.categories = {
          ...state.categories,
          loading: true,
          error: String(action.payload),
        };
      }
    });
  },
});

export default moviesSlice.reducer;
