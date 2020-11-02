import React from "react";
import Category from "../components/Category";
import Loading from "../components/Loading";
import { MainContainer } from "../styles";

function Movies() {
  const loading = true;
  return (
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Category
            title="Now Playing"
            list={[]}
            gridWidth={200}
            gridGap={15}
          />
          <Category title="Upcoming" list={[]} gridWidth={200} gridGap={15} />
          <Category title="Popular" list={[]} gridWidth={200} gridGap={15} />
          <Category title="Top Rated" list={[]} gridWidth={200} gridGap={15} />
        </>
      )}
    </MainContainer>
  );
}

export default Movies;
