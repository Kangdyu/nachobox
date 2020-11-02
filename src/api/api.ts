import axios from "axios";
import { MovieApiObject, TVApiObject } from "./types";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language: "ko-KR",
  },
});

export const movieApi: MovieApiObject = {
  nowPlaying: () =>
    instance.get("/movie/now_playing", {
      params: {
        region: "KR",
      },
    }),
  popular: () =>
    instance.get("/movie/popular", {
      params: {
        region: "KR",
      },
    }),
  topRated: () =>
    instance.get("/movie/top_rated", {
      params: {
        region: "KR",
      },
    }),
  upcoming: () =>
    instance.get("/movie/upcoming", {
      params: {
        region: "KR",
      },
    }),
  detail: (id: number) => instance.get(`/movie/${id}`),
  latest: () => instance.get("/movie/latest"),
};

export const tvApi: TVApiObject = {
  airingToday: () => instance.get("/tv/airing_today"),
  onTheAir: () => instance.get("/tv/on_the_air"),
  popular: () => instance.get("/tv/popular"),
  topRated: () => instance.get("/tv/top_rated"),
  detail: (id: number) => instance.get(`/tv/${id}`),
};
