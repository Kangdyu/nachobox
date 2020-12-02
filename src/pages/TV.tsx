import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Loading from "components/common/Loading";
import ScrollGrid from "components/common/ScrollGrid";
import TVMovieGridItem from "components/common/TVMovieGridItem";

import useAppDispatch from "hooks/useAppDispatch";

import { RootState } from "modules";
import { fetchTVCategories } from "modules/tvShows";

import { MainContainer } from "styles";
import ErrorPage from "components/common/ErrorPage";

function TV() {
  const {
    airingToday,
    onTheAir,
    popular,
    topRated,
    loading,
    error,
  } = useSelector((state: RootState) => state.tvShows.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTVCategories());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;
  return (
    <>
      <Helmet>
        <title>TV 프로그램 | NachoBox</title>
      </Helmet>
      <MainContainer>
        <>
          <ScrollGrid title="오늘의 프로그램" listLength={airingToday.length}>
            <TVMovieGridItem list={airingToday} />
          </ScrollGrid>
          <ScrollGrid title="현재 방영중" listLength={onTheAir.length}>
            <TVMovieGridItem list={onTheAir} />
          </ScrollGrid>
          <ScrollGrid title="인기 프로그램" listLength={popular.length}>
            <TVMovieGridItem list={popular} />
          </ScrollGrid>
          <ScrollGrid title="최고 평점 프로그램" listLength={topRated.length}>
            <TVMovieGridItem list={topRated} />
          </ScrollGrid>
        </>
      </MainContainer>
    </>
  );
}

export default TV;
