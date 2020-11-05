const BASE_URL = "https://image.tmdb.org/t/p";

type ImageSize = "w500" | "original";

export default function getImageURL(filename: string, size: ImageSize) {
  return `${BASE_URL}/${size}/${filename}`;
}
