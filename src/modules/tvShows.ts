import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tvApi } from "api/api";
import { CreditsInfo, TVDetail, TVListItem, Video } from "api/types";
import { AxiosError } from "axios";
import { FetchError, RootState } from "modules";

type TVShowsState = {
  categories: {
    airingToday: TVListItem[];
    onTheAir: TVListItem[];
    popular: TVListItem[];
    topRated: TVListItem[];
    loading: boolean;
    error: null | string;
  };
  details: {
    [id: number]: {
      detail: TVDetail | null;
      videos: Video[];
      credits: CreditsInfo | null;
      recommendations: TVListItem[];
      loading: boolean;
      error: null | string;
    };
  };
};

const initialState: TVShowsState = {
  categories: {
    airingToday: [],
    onTheAir: [],
    popular: [],
    topRated: [],
    loading: false,
    error: null,
  },
  details: {},
};

export const fetchTVCategories = createAsyncThunk<
  {
    airingToday: TVListItem[];
    onTheAir: TVListItem[];
    popular: TVListItem[];
    topRated: TVListItem[];
  },
  undefined,
  { state: RootState }
>(
  "TVs/fetchTVCategories",
  async (_, { rejectWithValue }) => {
    try {
      const airingToday = await tvApi.airingToday();
      const onTheAir = await tvApi.onTheAir();
      const popular = await tvApi.popular();
      const topRated = await tvApi.topRated();

      return {
        airingToday: airingToday.data.results,
        onTheAir: onTheAir.data.results,
        popular: popular.data.results,
        topRated: topRated.data.results,
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
        tvShows: {
          categories: { airingToday, onTheAir, popular, topRated },
        },
      } = getState();
      if (
        airingToday.length !== 0 &&
        onTheAir.length !== 0 &&
        popular.length !== 0 &&
        topRated.length !== 0
      ) {
        return false;
      }
    },
  }
);

export const fetchTVDetail = createAsyncThunk<
  {
    detail: TVDetail;
    videos: Video[];
    credits: CreditsInfo;
    recommendations: TVListItem[];
  },
  number,
  { state: RootState }
>(
  "TVs/fetchTVDetail",
  async (tvId, { rejectWithValue }) => {
    try {
      const detail = await tvApi.detail(tvId);
      const videos = await tvApi.videos(tvId);
      const credits = await tvApi.credits(tvId);
      const recommendations = await tvApi.recommendations(tvId);

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
    condition: (tvId, { getState }) => {
      const {
        tvShows: { details },
      } = getState();

      if (details[tvId]) {
        return false;
      }
    },
  }
);

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTVCategories.pending, (state, action) => {
      state.categories.loading = true;
    });
    builder.addCase(fetchTVCategories.fulfilled, (state, action) => {
      const { airingToday, onTheAir, popular, topRated } = action.payload;
      state.categories = {
        airingToday,
        onTheAir,
        popular,
        topRated,
        loading: false,
        error: null,
      };
    });
    builder.addCase(fetchTVCategories.rejected, (state, action) => {
      state.categories.error = action.payload as string;
      state.categories.loading = false;
    });

    builder.addCase(fetchTVDetail.pending, (state, action) => {
      state.details[action.meta.arg] = {
        detail: null,
        credits: null,
        recommendations: [],
        videos: [],
        loading: true,
        error: null,
      };
    });
    builder.addCase(fetchTVDetail.fulfilled, (state, action) => {
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
    builder.addCase(fetchTVDetail.rejected, (state, action) => {
      state.details[action.meta.arg].error = action.payload as string;
      state.details[action.meta.arg].loading = false;
    });
  },
});

export default tvShowsSlice.reducer;
