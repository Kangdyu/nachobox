import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { tvApi } from "../api/api";
import { TVListItem } from "../api/types";
import Loading from "../components/Loading";
import ScrollGrid from "../components/ScrollGrid";
import TVMovieGridItem from "../components/TVMovieGridItem";
import { MainContainer } from "../styles";

function TV() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ [name: string]: TVListItem[] }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: airingToday } = await tvApi.airingToday();
        const { data: onTheAir } = await tvApi.onTheAir();
        const { data: popular } = await tvApi.popular();
        const { data: topRated } = await tvApi.topRated();

        setData({
          airingToday: airingToday.results,
          onTheAir: onTheAir.results,
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
        <title>TV 프로그램 | NachoBox</title>
      </Helmet>
      {loading && <Loading />}
      {!loading && (
        <MainContainer>
          <>
            <ScrollGrid
              title="오늘의 프로그램"
              listLength={data.airingToday.length}
            >
              <TVMovieGridItem list={data.airingToday} />
            </ScrollGrid>
            <ScrollGrid title="현재 방영중" listLength={data.onTheAir.length}>
              <TVMovieGridItem list={data.onTheAir} />
            </ScrollGrid>
            <ScrollGrid title="인기 프로그램" listLength={data.popular.length}>
              <TVMovieGridItem list={data.popular} />
            </ScrollGrid>
            <ScrollGrid
              title="최고 평점 프로그램"
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

export default TV;
