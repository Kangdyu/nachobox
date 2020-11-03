import React, { useEffect, useState } from "react";
import { tvApi } from "../api/api";
import { TVListItem } from "../api/types";
import Category from "../components/Category";
import Loading from "../components/Loading";
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
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Category
            title="Airing Today"
            list={data.airingToday}
            gridWidth={200}
            gridGap={15}
          />
          <Category
            title="On The Air"
            list={data.onTheAir}
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

export default TV;
