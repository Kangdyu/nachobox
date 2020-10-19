import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: "ko-KR",
  },
});

export type MovieCategory =
  | "now_playing"
  | "upcoming"
  | "popular"
  | "top_rated";

export type TvCategory =
  | "airing_today"
  | "on_the_air"
  | "popular"
  | "top_rated";

export type CategoryItem = {
  id: number;
  poster_path: string | null;
  adult: string | null;
  release_date: string;
  title: string;
  vote_average: number;
};

export type CategoryList = {
  results: CategoryItem[];
  page: number;
  total_pages: number;
  total_items: number;
};

export function useMovieList(category: MovieCategory) {
  const [data, setData] = useState<CategoryList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`movie/${category}`, {
          params: {
            region: "KR",
          },
        });
        const result = response.data;
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);

  return { data, error, loading };
}

type MovieListState = {
  nowPlaying: CategoryList | null;
  upcoming: CategoryList | null;
  popular: CategoryList | null;
  topRated: CategoryList | null;
  error: string;
  loading: boolean;
};

type ApiAction =
  | {
      type: "setLists";
      payload: {
        nowPlaying: CategoryList;
        upcoming: CategoryList;
        popular: CategoryList;
        topRated: CategoryList;
      };
    }
  | { type: "setError"; payload: string };

function reducer(state: MovieListState, action: ApiAction): MovieListState {
  switch (action.type) {
    case "setLists":
      return {
        nowPlaying: action.payload.nowPlaying,
        upcoming: action.payload.upcoming,
        popular: action.payload.popular,
        topRated: action.payload.topRated,
        error: "",
        loading: false,
      };
    case "setError":
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error("Unknown Action");
  }
}

export function useMovieListAll() {
  const [result, dispatch] = useReducer(reducer, {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    topRated: null,
    error: "",
    loading: true,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: nowPlaying } = await api.get(`movie/now_playing`, {
          params: {
            region: "KR",
          },
        });
        const { data: upcoming } = await api.get(`movie/upcoming`, {
          params: {
            region: "KR",
          },
        });
        const { data: popular } = await api.get(`movie/popular`, {
          params: {
            region: "KR",
          },
        });
        const { data: topRated } = await api.get(`movie/top_rated`, {
          params: {
            region: "KR",
          },
        });

        dispatch({
          type: "setLists",
          payload: {
            nowPlaying,
            upcoming,
            popular,
            topRated,
          },
        });
      } catch (error) {
        dispatch({ type: "setError", payload: error });
      }
    }
    fetchData();
  }, []);

  return result;
}
// export function useMovieDetail(id: number) {}
// export function useTvList() {}
// export function useTvDetail() {}
