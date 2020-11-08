import React, { useEffect, useState } from "react";
import { movieApi } from "../api/api";
import { MovieListItem } from "../api/types";
import Loading from "../components/Loading";
import RecommendedMovie from "../components/RecommendedMovie";
import { MainContainer } from "../styles";

function getRecommendedMovie(movieList: MovieListItem[]) {
  const filtered = movieList.filter((movie) => movie.backdrop_path);
  const randomIdx = Math.floor(Math.random() * filtered.length);

  return filtered[randomIdx];
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [recommendedMovie, setRecommendedMovie] = useState<MovieListItem>();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: nowPlaying } = await movieApi.nowPlaying();

        setRecommendedMovie(getRecommendedMovie(nowPlaying.results));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && recommendedMovie && (
        <RecommendedMovie movie={recommendedMovie} />
      )}
    </>
  );
}

export default Home;
