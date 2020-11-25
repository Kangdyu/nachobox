import React, { useEffect, useState } from "react";
import { movieApi } from "../api/api";
import { MovieListItem } from "../api/types";
import Loading from "../components/Loading";
import TVMovieGridItem from "../components/TVMovieGridItem";
import { MainContainer } from "../styles";
import { Helmet } from "react-helmet";
import ScrollGrid from "../components/ScrollGrid";

function Movies() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ [name: string]: MovieListItem[] }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: nowPlaying } = await movieApi.nowPlaying();
        const { data: upcoming } = await movieApi.upcoming();
        const { data: popular } = await movieApi.popular();
        const { data: topRated } = await movieApi.topRated();

        setData({
          nowPlaying: nowPlaying.results,
          upcoming: upcoming.results,
          popular: popular.results,
          topRated: topRated.results,
        });
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
      <Helmet>
        <title>영화 | NachoBox</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && (
        <MainContainer>
          <>
            <ScrollGrid title="현재 상영중" listLength={data.nowPlaying.length}>
              <TVMovieGridItem list={data.nowPlaying} />
            </ScrollGrid>
            <ScrollGrid title="개봉 예정" listLength={data.upcoming.length}>
              <TVMovieGridItem list={data.upcoming} />
            </ScrollGrid>
            <ScrollGrid title="인기 영화" listLength={data.popular.length}>
              <TVMovieGridItem list={data.popular} />
            </ScrollGrid>
            <ScrollGrid
              title="최고 평점 영화"
              listLength={data.topRated.length}
            >
              <TVMovieGridItem list={data.topRated} />
            </ScrollGrid>
          </>
        </MainContainer>
      )}
    </>
  );
}

export default Movies;
