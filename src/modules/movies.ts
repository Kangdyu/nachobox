import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { movieApi } from "api/api";
import { CreditsInfo, MovieDetail, MovieListItem, Video } from "api/types";
import { RootState, FetchError } from "modules";

type MoviesState = {
  recommended: {
    movie: MovieListItem | null;
    loading: boolean;
    error: string | null;
  };
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
      detail: MovieDetail | null;
      videos: Video[];
      credits: CreditsInfo | null;
      recommendations: MovieListItem[];
      loading: boolean;
      error: null | string;
    };
  };
};

const initialState: MoviesState = {
  recommended: {
    movie: null,
    loading: false,
    error: null,
  },
  categories: {
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
    loading: false,
    error: null,
  },
  details: {},
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
      let err: AxiosError<FetchError> = error;
      if (!err.response) {
        throw error;
      }
      return rejectWithValue(err.response.data.status_message);
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

export const fetchRecommendedMovie = createAsyncThunk<
  MovieListItem,
  undefined,
  { state: RootState }
>(
  "movies/fetchRecommendedMovie",
  async (_, { getState, rejectWithValue }) => {
    let { nowPlaying } = getState().movies.categories;
    if (nowPlaying.length === 0) {
      try {
        const res = await movieApi.nowPlaying();
        nowPlaying = res.data.results;
      } catch (error) {
        let err: AxiosError<FetchError> = error;
        if (!err.response) {
          throw error;
        }
        return rejectWithValue(err.response.data.status_message);
      }
    }

    const filtered = nowPlaying.filter((movie) => movie.backdrop_path);
    const randomIdx = Math.floor(Math.random() * filtered.length);

    return filtered[randomIdx];
  },
  {
    condition: (_, { getState }) => {
      if (getState().movies.recommended.movie) {
        return false;
      }
    },
  }
);

export const fetchMovieDetail = createAsyncThunk<
  {
    detail: MovieDetail;
    videos: Video[];
    credits: CreditsInfo;
    recommendations: MovieListItem[];
  },
  number,
  { state: RootState }
>(
  "movies/fetchMovieDetail",
  async (movieId, { rejectWithValue }) => {
    try {
      const detail = await movieApi.detail(movieId);
      const videos = await movieApi.videos(movieId);
      const credits = await movieApi.credits(movieId);
      const recommendations = await movieApi.recommendations(movieId);

      return {
        detail: detail.data,
        videos: videos.data.results,
        credits: credits.data,
        recommendations: recommendations.data.results,
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
      state.categories.error = action.payload as string;
      state.categories.loading = false;
    });

    builder.addCase(fetchRecommendedMovie.pending, (state, action) => {
      state.recommended.loading = true;
    });
    builder.addCase(fetchRecommendedMovie.fulfilled, (state, action) => {
      state.recommended.movie = action.payload;
      state.recommended.loading = false;
    });
    builder.addCase(fetchRecommendedMovie.rejected, (state, action) => {
      state.recommended.error = action.payload as string;
      state.recommended.loading = false;
    });

    builder.addCase(fetchMovieDetail.pending, (state, action) => {
      state.details[action.meta.arg] = {
        detail: null,
        credits: null,
        recommendations: [],
        videos: [],
        loading: true,
        error: null,
      };
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
      state.details[action.meta.arg].error = action.payload as string;
      state.details[action.meta.arg].loading = false;
    });
  },
});

export default moviesSlice.reducer;
