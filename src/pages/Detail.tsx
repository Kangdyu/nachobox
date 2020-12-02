import React from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieDetailContainer from "components/detail/MovieDetailContainer";
import TVDetailContainer from "components/detail/TVDetailContainer";

function Detail() {
  const isMovie = useLocation().pathname.split("/")[1] === "movies";
  const { id } = useParams<{ id: string }>();

  return (
    <>
      {isMovie && <MovieDetailContainer id={+id} />}
      {!isMovie && <TVDetailContainer id={+id} />}
    </>
  );
}

export default Detail;
