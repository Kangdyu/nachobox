import React, { useEffect, useState } from "react";
import { movieApi } from "../api/api";
import { MovieListItem } from "../api/types";
import Category from "../components/Category";
import Loading from "../components/Loading";
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
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Category
            title="Now Playing"
            list={data.nowPlaying}
            gridWidth={200}
            gridGap={15}
          />
          <Category
            title="Upcoming"
            list={data.upcoming}
            gridWidth={200}
            gridGap={15}
          />
          <Category
            title="Popular"
            list={data.popular}
            gridWidth={200}
            gridGap={15}
          />
          <Category
            title="Top Rated"
            list={data.topRated}
            gridWidth={200}
            gridGap={15}
          />
        </>
      )}
    </MainContainer>
  );
}

export default Movies;
