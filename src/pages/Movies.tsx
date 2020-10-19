import React from "react";
import { CategoryList, useMovieListAll } from "../common/api";
import Category from "../components/Category";
import Loading from "../components/Loading";
import { MainContainer } from "../styles";

function Movies() {
  const {
    nowPlaying,
    upcoming,
    popular,
    topRated,
    error,
    loading,
  } = useMovieListAll();

  return (
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Category
            title="Now Playing"
            list={nowPlaying as CategoryList}
            gridWidth={200}
            gridGap={15}
          />
          <Category
            title="Upcoming"
            list={upcoming as CategoryList}
            gridWidth={200}
            gridGap={15}
          />
          <Category
            title="Popular"
            list={popular as CategoryList}
            gridWidth={200}
            gridGap={15}
          />
          <Category
            title="Top Rated"
            list={topRated as CategoryList}
            gridWidth={200}
            gridGap={15}
          />
        </>
      )}
    </MainContainer>
  );
}

export default Movies;
