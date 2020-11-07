import { AxiosResponse } from "axios";

interface CommonListItem {
  poster_path: string | null;
  overview: string;
  id: number;
  original_language: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

export interface MovieListItem extends CommonListItem {
  adult: boolean;
  release_date: string;
  original_title: string;
  title: string;
  video: boolean;
}

export interface TVListItem extends CommonListItem {
  first_air_date: string;
  name: string;
  original_name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface MovieDetail extends MovieListItem {
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
}

export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface TVDetail extends TVListItem {
  created_by: Creator[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  langauges: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  networks: ProductionCompany[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  production_companies: ProductionCompany[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  };
  status: string;
  type: string;
}

export interface CategoryList<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

type VideoSize = 360 | 480 | 720 | 1080;

type VideoType =
  | "Trailer"
  | "Teaser"
  | "Clip"
  | "Featurette"
  | "Behind the Scenens"
  | "Bloopers";

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: VideoSize;
  type: VideoType;
}

export interface VideoInfo {
  id: number;
  results: Video[];
}

export interface Cast {
  id: number;
  credit_id: string;
  order: number;
  name: string;
  character: string;
  gender: number | null;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  credit_id: string;
  name: string;
  department: string;
  job: string;
  gender: number | null;
  profile_path: string | null;
}

export interface CreditsInfo {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface MovieApiObject {
  nowPlaying: () => Promise<AxiosResponse<CategoryList<MovieListItem>>>;
  popular: () => Promise<AxiosResponse<CategoryList<MovieListItem>>>;
  topRated: () => Promise<AxiosResponse<CategoryList<MovieListItem>>>;
  upcoming: () => Promise<AxiosResponse<CategoryList<MovieListItem>>>;
  detail: (id: number) => Promise<AxiosResponse<MovieDetail>>;
  videos: (id: number) => Promise<AxiosResponse<VideoInfo>>;
  credits: (id: number) => Promise<AxiosResponse<CreditsInfo>>;
  recommendations: (
    id: number
  ) => Promise<AxiosResponse<CategoryList<MovieListItem>>>;
}

export interface TVApiObject {
  airingToday: () => Promise<AxiosResponse<CategoryList<TVListItem>>>;
  onTheAir: () => Promise<AxiosResponse<CategoryList<TVListItem>>>;
  popular: () => Promise<AxiosResponse<CategoryList<TVListItem>>>;
  topRated: () => Promise<AxiosResponse<CategoryList<TVListItem>>>;
  detail: (id: number) => Promise<AxiosResponse<TVDetail>>;
  videos: (id: number) => Promise<AxiosResponse<VideoInfo>>;
  credits: (id: number) => Promise<AxiosResponse<CreditsInfo>>;
  recommendations: (
    id: number
  ) => Promise<AxiosResponse<CategoryList<TVListItem>>>;
}
