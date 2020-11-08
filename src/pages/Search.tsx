import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { movieApi, tvApi } from "../api/api";
import { MovieListItem, TVListItem } from "../api/types";
import Loading from "../components/Loading";
import ScrollGridCategory from "../components/ScrollGridCategory";
import TVMovieGridItem from "../components/TVMovieGridItem";
import useQuery from "../hooks/useQuery";
import { MainContainer } from "../styles";

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 10px;
  margin-bottom: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

type SearchResult = {
  movies: MovieListItem[];
  tvShows: TVListItem[];
};

function Search() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SearchResult>({ movies: [], tvShows: [] });
  const searchTerm = useQuery("term");

  useEffect(() => {
    async function fetchData() {
      if (!searchTerm) return;

      setLoading(true);
      try {
        const { data: movies } = await movieApi.search(searchTerm);
        const { data: tvShows } = await tvApi.search(searchTerm);

        setData({ movies: movies.results, tvShows: tvShows.results });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchTerm]);

  console.log(data.movies, data.tvShows);

  return (
    <MainContainer>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Title>"{searchTerm}" 검색 결과</Title>
          {data.movies.length !== 0 && (
            <ScrollGridCategory
              title="영화"
              columnWidth={200}
              gap={15}
              listLength={data.movies.length}
              scrollRatio={2}
            >
              <TVMovieGridItem list={data.movies} />
            </ScrollGridCategory>
          )}
          {data.tvShows.length !== 0 && (
            <ScrollGridCategory
              title="TV 프로그램"
              columnWidth={200}
              gap={15}
              listLength={data.tvShows.length}
              scrollRatio={2}
            >
              <TVMovieGridItem list={data.tvShows} />
            </ScrollGridCategory>
          )}
          {data.movies.length === 0 &&
            data.tvShows.length === 0 &&
            "검색 결과가 없습니다."}
        </>
      )}
    </MainContainer>
  );
}

export default Search;
