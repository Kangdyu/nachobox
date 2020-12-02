import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieApi } from "api/api";
import { CreditsInfo, MovieDetail, MovieListItem, VideoInfo } from "api/types";
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
  {
    nowPlaying: MovieListItem[];
    popular: MovieListItem[];
    topRated: MovieListItem[];
    upcoming: MovieListItem[];
  },
  undefined,
  { state: RootState }
>(
  "movies/fetchMovieCategories",
  async () => {
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

export const fetchMovieDetail = createAsyncThunk<
  {
    detail: MovieDetail;
    videos: VideoInfo;
    credits: CreditsInfo;
    recommendations: MovieListItem[];
  },
  number,
  { state: RootState }
>(
  "movies/fetchMovieDetail",
  async (movieId) => {
    const detail = await movieApi.detail(movieId);
    const videos = await movieApi.videos(movieId);
    const credits = await movieApi.credits(movieId);
    const recommendations = await movieApi.recommendations(movieId);

    return {
      detail: detail.data,
      videos: videos.data,
      credits: credits.data,
      recommendations: recommendations.data.results,
    };
  },
  {
    condition: (movieId, { getState }) => {
      const {
        movies: { details },
      } = getState();

      if (details[movieId]) {
        return false;
      }
    },
  }
);

export const fetchMovieSearchResults = createAsyncThunk<
  MovieListItem[],
  string,
  { state: RootState }
>(
  "movies/fetchMovieSearchResults",
  async (query) => {
    const response = await movieApi.search(query);
    return response.data.results;
  },
  {
    condition: (query, { getState }) => {
      const {
        movies: { searches },
      } = getState();

      if (searches[query]) {
        return false;
      }
    },
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieCategories.pending, (state, action) => {
      state.categories.loading = true;
    });
    builder.addCase(fetchMovieCategories.fulfilled, (state, action) => {
      const { nowPlaying, popular, topRated, upcoming } = action.payload;
      state.categories = {
        nowPlaying,
        popular,
        topRated,
        upcoming,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchMovieCategories.rejected, (state, action) => {
      state.categories.error = action.error.message as string;
      state.categories.loading = false;
    });

    builder.addCase(fetchMovieDetail.pending, (state, action) => {
      state.details[action.meta.arg].loading = true;
    });
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      const { detail, videos, credits, recommendations } = action.payload;
      state.details[action.meta.arg] = {
        detail,
        videos,
        credits,
        recommendations,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchMovieDetail.rejected, (state, action) => {
      state.details[action.meta.arg].error = action.error.message as string;
      state.details[action.meta.arg].loading = false;
    });

    builder.addCase(fetchMovieSearchResults.pending, (state, action) => {
      state.searches[action.meta.arg].loading = true;
    });
    builder.addCase(fetchMovieSearchResults.fulfilled, (state, action) => {
      state.searches[action.meta.arg].results = action.payload;
      state.searches[action.meta.arg].loading = false;
    });
    builder.addCase(fetchMovieSearchResults.rejected, (state, action) => {
      state.searches[action.meta.arg].error = action.error.message as string;
      state.searches[action.meta.arg].loading = false;
    });
  },
});

export default moviesSlice.reducer;
