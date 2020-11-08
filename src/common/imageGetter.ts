const TMDB_URL = "https://image.tmdb.org/t/p";
const YOUTUBE_URL = "https://img.youtube.com/vi";

type PosterSize = "w500" | "original";

export function getPosterURL(filename: string, size: PosterSize) {
  return `${TMDB_URL}/${size}/${filename}`;
}

export function getYoutubeThumbnailURL(filename: string) {
  return `${YOUTUBE_URL}/${filename}/0.jpg`;
}
