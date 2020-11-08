import React, { useEffect, useState } from "react";
import { movieApi } from "../api/api";
import { MovieListItem } from "../api/types";
import Loading from "../components/Loading";
import TVMovieGridItem from "../components/TVMovieGridItem";
import ScrollGridCategory from "../components/ScrollGridCategory";
import { MainContainer } from "../styles";

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
      {loading && <Loading />}
      {!loading && (
        <MainContainer>
          <>
            <ScrollGridCategory
              title="현재 상영중"
              columnWidth={200}
              gap={15}
              scrollRatio={2}
              listLength={data.nowPlaying.length}
            >
              <TVMovieGridItem list={data.nowPlaying} />
            </ScrollGridCategory>
            <ScrollGridCategory
              title="개봉 예정"
              columnWidth={200}
              gap={15}
              scrollRatio={2}
              listLength={data.upcoming.length}
            >
              <TVMovieGridItem list={data.upcoming} />
            </ScrollGridCategory>
            <ScrollGridCategory
              title="인기 영화"
              columnWidth={200}
              gap={15}
              scrollRatio={2}
              listLength={data.popular.length}
            >
              <TVMovieGridItem list={data.popular} />
            </ScrollGridCategory>
            <ScrollGridCategory
              title="최고 평점 영화"
              columnWidth={200}
              gap={15}
              scrollRatio={2}
              listLength={data.topRated.length}
            >
              <TVMovieGridItem list={data.topRated} />
            </ScrollGridCategory>
          </>
        </MainContainer>
      )}
    </>
  );
}

export default Movies;
