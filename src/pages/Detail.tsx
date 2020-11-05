import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { movieApi, tvApi } from "../api/api";
import { MovieDetail, TVDetail } from "../api/types";
import { isMovieDetail } from "../common/typeGuards";
import Loading from "../components/Loading";
import { MainContainer } from "../styles";

function Detail() {
  const isMovie = useLocation().pathname.split("/")[1] === "movies";
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MovieDetail | TVDetail>();

  useEffect(() => {
    async function fetchData() {
      try {
        if (isMovie) {
          const { data: movie } = await movieApi.detail(+id);

          setData(movie);
        } else {
          const { data: tv } = await tvApi.detail(+id);

          setData(tv);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, isMovie]);

  return (
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        data && <>{isMovieDetail(data) ? "Movie" : "TV"}</>
      )}
    </MainContainer>
  );
}

export default Detail;
