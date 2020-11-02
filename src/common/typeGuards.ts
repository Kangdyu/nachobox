import { MovieListItem, TVListItem } from "../api/types";

export function isMovieItem(
  target: MovieListItem | TVListItem
): target is MovieListItem {
  return (target as MovieListItem).title !== undefined;
}
