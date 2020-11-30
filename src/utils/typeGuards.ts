import { MovieDetail, MovieListItem, TVDetail, TVListItem } from "../api/types";

export function isMovieListItem(
  target: MovieListItem | TVListItem
): target is MovieListItem {
  return (target as MovieListItem).title !== undefined;
}

export function isMovieDetail(
  target: MovieDetail | TVDetail
): target is MovieDetail {
  return (target as MovieDetail).title !== undefined;
}
