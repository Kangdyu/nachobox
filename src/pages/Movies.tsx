import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Loading from "components/common/Loading";
import TVMovieGridItem from "components/common/TVMovieGridItem";
import ScrollGrid from "components/common/ScrollGrid";

import { RootState } from "modules";

import { MainContainer } from "styles";
import { fetchMovieCategories } from "modules/movies";
import useAppDispatch from "hooks/useAppDispatch";

function Movies() {
  const {
    nowPlaying,
    popular,
    topRated,
    upcoming,
    loading,
    error,
  } = useSelector((state: RootState) => state.movies.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovieCategories());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>영화 | NachoBox</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && (
        <MainContainer>
          <>
            <ScrollGrid title="현재 상영중" listLength={nowPlaying.length}>
              <TVMovieGridItem list={nowPlaying} />
            </ScrollGrid>
            <ScrollGrid title="개봉 예정" listLength={upcoming.length}>
              <TVMovieGridItem list={upcoming} />
            </ScrollGrid>
            <ScrollGrid title="인기 영화" listLength={popular.length}>
              <TVMovieGridItem list={popular} />
            </ScrollGrid>
            <ScrollGrid title="최고 평점 영화" listLength={topRated.length}>
              <TVMovieGridItem list={topRated} />
            </ScrollGrid>
          </>
        </MainContainer>
      )}
    </>
  );
}

export default Movies;
