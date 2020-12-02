import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Loading from "components/common/Loading";
import RecommendedMovie from "components/home/RecommendedMovie";

import useAppDispatch from "hooks/useAppDispatch";

import { RootState } from "modules";
import { fetchRecommendedMovie } from "modules/movies";
import ErrorPage from "components/common/ErrorPage";

function Home() {
  const { movie, loading, error } = useSelector(
    (state: RootState) => state.movies.recommended
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecommendedMovie());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <ErrorPage message={error} />;
  if (!movie)
    return (
      <ErrorPage message="추천 영화 정보를 불러오는 데 오류가 발생했습니다." />
    );
  return (
    <>
      <Helmet>
        <title>홈 | NachoBox</title>
      </Helmet>
      <RecommendedMovie movie={movie} />
    </>
  );
}

export default Home;
