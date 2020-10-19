import axios from "axios";
import { useEffect, useState } from "react";

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

// TODO: add region parameter for now playing, upcoming
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

export function useMovieListAll() {
  // TODO: change to useReducer
  const [nowPlaying, setNowPlaying] = useState<CategoryList | null>(null);
  const [upcoming, setUpcoming] = useState<CategoryList | null>(null);
  const [popular, setPopular] = useState<CategoryList | null>(null);
  const [topRated, setTopRated] = useState<CategoryList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: nowPlayingData } = await api.get(`movie/now_playing`, {
          params: {
            region: "KR",
          },
        });
        const { data: upcomingData } = await api.get(`movie/upcoming`, {
          params: {
            region: "KR",
          },
        });
        const { data: popularData } = await api.get(`movie/popular`, {
          params: {
            region: "KR",
          },
        });
        const { data: topRatedData } = await api.get(`movie/top_rated`, {
          params: {
            region: "KR",
          },
        });

        setNowPlaying(nowPlayingData);
        setUpcoming(upcomingData);
        setPopular(popularData);
        setTopRated(topRatedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { nowPlaying, upcoming, popular, topRated, error, loading };
}
// export function useMovieDetail(id: number) {}
// export function useTvList() {}
// export function useTvDetail() {}
