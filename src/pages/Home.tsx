import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import Loading from "components/common/Loading";
import RecommendedMovie from "components/home/RecommendedMovie";

import useAppDispatch from "hooks/useAppDispatch";

import { RootState } from "modules";
import { fetchRecommendedMovie } from "modules/movies";

function Home() {
  const { movie, loading, error } = useSelector(
    (state: RootState) => state.movies.recommended
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecommendedMovie());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>홈 | NachoBox</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && movie && <RecommendedMovie movie={movie} />}
    </>
  );
}

export default Home;
